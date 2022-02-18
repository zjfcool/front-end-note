/**
 * tree 广度优先遍历
 */
const data = {
    value: 1,
    children: [
        {
            value: 2,
            children: [
                {
                    value: 3,
                    children: []
                },
                {
                    value: 4,
                    children: []
                }
            ]
        },
        {
            value: 5,
            children: [
                {
                    value: 6,
                    children: []
                },
                {
                    value: 7,
                    children: []
                }
            ]
        }
    ]
}
const bfs = (data) => {
    const nodes = [data];
    while (nodes.length > 0) {
        const node = nodes.shift();
        node.children.forEach(n => nodes.push(n));
        console.log(node.value)
    }
}
bfs(data)