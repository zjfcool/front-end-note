export default function render(vdom, container) {
    if (typeof vdom === 'string') {
        const textNode = document.createTextNode(vdom);
        return container.appendChild(textNode)
    };
    const element = document.createElement(vdom.type);
    if (vdom.props) {
        for (let k in vdom.props) {
            element.setAttribute(k, vdom.props[k])
        }
    }

    vdom.children.forEach(child => {
        render(child, element)
    })
    container.appendChild(element);
    return container;
}