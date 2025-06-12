import Component, {ComponentProps} from "./Component";
import {BlockClass} from "../type/Types";
import {isEqual} from "../utils/Utils";

export class Route {
    private readonly _blockClass: BlockClass;
    private readonly _props: ComponentProps;
    private readonly _selector: string;
    private readonly _tagName: string;
    private readonly _titlePage: string;
    private _block: Component | null = null;
    readonly _pathname: string;

    constructor(pathname: string, titlePage: string, selector: string, view: BlockClass, tagName: string, props: ComponentProps) {
        this._pathname = pathname;
        this._titlePage = titlePage;
        this._selector = selector;
        this._tagName = tagName;
        this._blockClass = view;
        this._props = props;
    }

    render() {
        const root = document.querySelector(this._selector);
        if (!root) return;
        const component = new this._blockClass(this._tagName, this._props);
        root.innerHTML = '';
        root.appendChild(component.getContent());
        document.title = this._titlePage;
        this._block?.dispatchComponentDidMount();
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._block = new this._blockClass(this._tagName, this._props);
            this._block.render();
        }
    }

    match(pathname: string) {
        const routeParts = this._pathname.split('/').filter(Boolean);
        const pathParts = pathname.split('/').filter(Boolean);
        if (routeParts.length !== pathParts.length) return false;
        for (let i = 0; i < routeParts.length; i++) {
            const routePart = routeParts[i];
            const pathPart = pathParts[i];
            if (!routePart.startsWith(':') && !isEqual(routePart, pathPart)) {
                return false;
            }
        }
        return true;
    }

    leave() {
        this._block = null;
    }
}
