import Component, {ComponentProps} from "./Component";

function isEqual(lhs: string, rhs: string): boolean {
    return lhs === rhs;
}

export type BlockClass = new (tagName: string, props: ComponentProps) => Component;

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
        return isEqual(pathname, this._pathname);
    }

    leave() {
        this._block = null;
    }
}
