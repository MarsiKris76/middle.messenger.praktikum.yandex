import EventBus from "./EventBus";
import {v4 as makeID} from "uuid";
import Handlebars from "handlebars";

type InnerElement = HTMLElement | DocumentFragment;

interface Children {
    [key: string]: Component<ComponentProps>;
}

export interface ChildrenLists {
    [key: string]: Component<ComponentProps>[];
}

export interface ComponentProps {
    [key: string]: unknown;
    children?: Children;
    events?: Record<string, (event: Event) => void>;
    list?: ChildrenLists;
    attr?: Record<string, string>;
}

export default abstract class Component<Props extends ComponentProps = ComponentProps>{
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render'
    } as const;

    _id: string;
    _tagName: string;
    _element: InnerElement | undefined;
    _children: Children;
    _lists: ChildrenLists;
    _eventBus: EventBus;
    _props: Props;
    _setUpdate: boolean = false;
    _isFragment: boolean = false;

    constructor(tagName: string = 'div', propsAndChildren: Props) {
        const { children, props, lists } = this.getChildren(propsAndChildren);
        this._eventBus = new EventBus();
        this._id = makeID();
        this._tagName = tagName;
        this._children = this._makePropsProxy(children, this);
        this._lists = this._makePropsProxy(lists, this);
        this._props = this._makePropsProxy({...props as Props, __id: this._id}, this);
        this._isFragment = typeof this._props?.isFragment === 'boolean' ? this._props.isFragment : false;
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
        this._element = this.createDocumentElement(this._tagName, false);
        this._eventBus.emit(Component.EVENTS.FLOW_RENDER);
    }

    private _componentDidMount() {
        this.componentDidMount();
        Object.values(this._children).forEach(child => { child.dispatchComponentDidMount() });
    }

    componentDidMount() {}

    dispatchComponentDidMount() {
        this._eventBus.emit(Component.EVENTS.FLOW_CDM);
        if (Object.keys(this._children).length)
            this._eventBus.emit(Component.EVENTS.FLOW_RENDER);
    }

    private _componentDidUpdate(oldProps: unknown, newProps: unknown) {
        const isReRender = this.componentDidUpdate(oldProps, newProps);
        if (isReRender)
            this._eventBus.emit(Component.EVENTS.FLOW_RENDER);
    }

    componentDidUpdate(oldProps: unknown, newProps: unknown) {
        return oldProps !== newProps;
    }

    setProps(newProps: ComponentProps) {
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
            this._eventBus.emit(Component.EVENTS.FLOW_CDU, oldValues, this._props);
            this._setUpdate = false;
        }
    };

    private _makePropsProxy<T extends object>(props: T, current: Component<ComponentProps>): T {
        return new Proxy<T>(props, {
            get(target, prop) {
                const value = Reflect.get(target, prop);
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target, prop, value) {
                const oldValue = Reflect.get(target, prop);
                if (oldValue !== value) {
                    Reflect.set(target, prop, value);
                    current._setUpdate = true;
                }
                return true;
            },
            deleteProperty() {
                throw new Error('Нет доступа');
            }
        });
    }

    compile(template: string, props?: ComponentProps): InnerElement {
        if (typeof(props) == 'undefined')
            props = this._props;
        else
            props = { ...this._props, ...props};
        const propsAndStuds = { ...props };
        if (propsAndStuds.children)
            this._children = propsAndStuds.children;
        if (propsAndStuds.list)
            this._lists = propsAndStuds.list;
        Object.entries(this._children).forEach(([key, child]) => {
            propsAndStuds[key] = `<div data-id="${child._id}"></div>`;
        });
        Object.entries(this._lists).forEach(([key]) => {
            propsAndStuds[key] = `<div data-id="_temp_${key}"></div>`;
        });
        const fragment = this.createDocumentElement('template', true) as HTMLTemplateElement;
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
            const listContent = this.createDocumentElement('template', true) as HTMLTemplateElement;
            child?.forEach(item => {
                listContent.content.append(item.getContent());
            });
            stub.replaceWith(listContent.content);

        });
        return fragment.content;
    }

    private _render() {
        const block = this.render();
        if (this._element instanceof HTMLElement) {
            this.removeEvents();
            this._element.innerHTML = '';
        }
        this._element?.appendChild(block);
        this.addAttribute();
        this.addEvents();
    }

    abstract render(): InnerElement;

    addEvents() {
        const { events = {} } = this._props;
        Object.keys(events).forEach( (eventsName: string) => {
            if (this._isFragment)
                this._element?.children[0].addEventListener(eventsName, events[eventsName]);
            else
                this._element?.addEventListener(eventsName, events[eventsName]);
        });
    }

    removeEvents() {
        const { events = {} } = this._props;
        Object.keys(events).forEach( (eventsName: string) => {
            if (this._isFragment)
                this._element?.children[0].removeEventListener(eventsName, events[eventsName]);
            else
                this._element?.removeEventListener(eventsName, events[eventsName]);
        })
    }

    addAttribute() {
        const { attr = {} } = this._props;
        Object.entries(attr).forEach( ([key, value]) => {
            if (this._element instanceof HTMLElement)
                this._element.setAttribute(key, value);
        })
    }

    getChildren(propsAndChilds: ComponentProps) {
        const children: Children = {};
        const props: ComponentProps = {};
        const lists: ChildrenLists = {};
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
        return this._element as InnerElement;
    }

    createDocumentElement(tagName: string, isTemplate: boolean) {
        if (this._isFragment && !isTemplate)
            return document.createDocumentFragment();
        //const element = ;
        // не помню откуда и зачем, но подозреваю, что в будущем пригодиться
        // if (this._props.settings?.withInternalID)
        //     element.setAttribute('date-id', this._id)
        //return element;
        return document.createElement(tagName);
    }

}
