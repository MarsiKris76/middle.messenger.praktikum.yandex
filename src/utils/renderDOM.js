export default function renderDOM(query, component) {
    const root = document.querySelector(query);
    root.appendChild(component.getContent());
    component.dispatchComponentDidMount();
    return root;
}