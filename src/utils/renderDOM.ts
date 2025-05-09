import Component from "../services/Component";

export default function renderDOM(query: string, component: Component) {
    const root = document.querySelector(query);
    root?.replaceWith(component.getContent());
    component.dispatchComponentDidMount();
    return root;
}