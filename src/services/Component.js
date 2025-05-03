import EventBus from "./EventBus";
import {v4 as makeID} from "uuid";
import Handlebars from "handlebars";

export default class Component {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    };

    _id;
    _element;
    _children;
    _lists;
    _meta;
    _eventBus;
    _props;
    _setUpdate = false;
    _isFragment = false;

    constructor(tagName = "div", propsAndChildren = {}) {
        const { children, props, lists } = this.getChildren(propsAndChildren);
        this._isFragment = props?.isFragment ?? false;
        this._eventBus = new EventBus();
        this._id = makeID();
        this._meta = {
            tagName,
            props
        };
        this._children = this._makePropsProxy(children);
        this._lists = this._makePropsProxy(lists);
        this._props = this._makePropsProxy({ ...props, __id: this._id });
        this.registerEvents();
        this._eventBus.emit(Component.EVENTS.INIT);
    }

    registerEvents() {
        this._eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
        this._eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        this._eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        this._eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    init() {
        this._element = this.createDocumentElement(this._meta?.tagName, false);
        this._eventBus.emit(Component.EVENTS.FLOW_RENDER);
    }

    _componentDidMount() {
        this.componentDidMount();
        Object.values(this._children).forEach(child => { child.dispatchComponentDidMount() });
    }

    componentDidMount() {}

    dispatchComponentDidMount() {
        this._eventBus.emit(Component.EVENTS.FLOW_CDM);
        if (Object.keys(this._children).length)
            this._eventBus.emit(Component.EVENTS.FLOW_RENDER);
    }

    _componentDidUpdate(oldProps, newProps) {
        const isReRender = this.componentDidUpdate(oldProps, newProps);
        if (isReRender)
            this._eventBus.emit(Component.EVENTS.FLOW_RENDER);
    }

    componentDidUpdate(oldProps, newProps) {
        return oldProps !== newProps;
    }

    setProps(newProps) {
        if (!newProps)
            return;
        this._setUpdate = false;
        const oldValues = { ...this._props };
        const  { children, props } = this.getChildren(newProps);
        if (Object.values(children).length)
            Object.assign(this._children, children);
        if (Object.values(props).length)
            Object.assign(this._props, props);
        if (this._setUpdate) {
            this._eventBus.emit(Component.EVENTS.FLOW_CDM, oldValues, this._props);
            this._setUpdate = false;
        }
    };

    _makePropsProxy(props) {
        return new Proxy(props, {
            get(target, prop) {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target, prop, value) {
                if (target[prop] !== value) {
                    target[prop] = value;
                    this._setUpdate = true;
                }
                return true;
            },
            deleteProperty() {
                throw new Error("Нет доступа");
            }
        });
    }

    get element() {
        return this._element;
    }

    compile(template, props) {
        if (typeof(props) == "undefined")
            props = this._props;
        else
            props = { ...this._props, props}
        const propsAndStuds = { ...props };
        if (propsAndStuds?.props?.children)
            this._children = propsAndStuds.props.children;
        Object.entries(this._children).forEach(([key, child]) => {
            propsAndStuds[key] = `<div data-id="${child._id}"></div>`;
        });
        Object.entries(this._lists).forEach(([key]) => {
            propsAndStuds[key] = `<div data-id="_temp_${key}"></div>`;
        });
        const fragment = this.createDocumentElement('template', true);
        fragment.innerHTML = Handlebars.compile(template)(propsAndStuds);
        Object.values(this._children).forEach((child) => {
            const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
            if (stub)
                stub.replaceWith(child.getContent());
        });
        Object.entries(this._lists).forEach(([key, child]) => {
            const stub = fragment.content.querySelector(`[data-id="_temp_${key}"]`);
            if (!stub)
                return;
            const listContent = this.createDocumentElement('template', true);
            child.forEach(item => {
                if (item instanceof Component)
                    listContent.content.append(item.getContent());
                else
                    listContent.content.append(`${item}`);
            });
            stub.replaceWith(listContent.content);

        });
        return fragment.content;
    }

    _render() {
        const block = this.render();
        this.removeEvents();
        this._element.innerHTML = '';
        this._element.appendChild(block);
        this.addAttribute();
        this.addEvents();
    }

    render() {}

    addEvents() {
        const { events = {} } = this._props;
        Object.keys(events).forEach( (eventsName) => {
            this._element.addEventListener(eventsName, events[eventsName]);
        });
    }

    removeEvents() {
        const { events = {} } = this._props;
        Object.keys(events).forEach( (eventsName) => {
            this._element.removeEventListener(eventsName, events[eventsName]);
        })
    }

    addAttribute() {
        const { attr = {} } = this._props;
        Object.entries(attr).forEach( ([key, value]) => {
            this._element.setAttribute(key, value);
        })
    }

    getChildren(propsAndChilds) {
        const children = {};
        const props = {};
        const lists = {};
        Object.keys(propsAndChilds).forEach( key => {
            if (propsAndChilds[key] instanceof Component)
                children[key] = propsAndChilds[key];
            else if (Array.isArray(propsAndChilds[key]))
                lists[key] = propsAndChilds[key];
            else
                props[key] = propsAndChilds[key];
        });
        return { children, props, lists };
    }

    getContent() {
        return this._element;
    }

    createDocumentElement(tagName, isTemplate) {
        if (this._isFragment && !isTemplate)
            return document.createDocumentFragment();
        const element = document.createElement(tagName);
        if (this._props.settings?.withInternalID)
            element.setAttribute('date-id', this._id)
        return element;
    }

    show() {
        this.getContent().style.display = "block";
    }

    hide() {
        this.getContent().style.display = "none";
    }
}