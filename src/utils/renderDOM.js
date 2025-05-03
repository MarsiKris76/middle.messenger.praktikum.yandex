export default function renderDOM(query, component) {
    const root = document.querySelector(query);
    root.replaceWith(component.getContent());
    component.dispatchComponentDidMount();
    return root;
}