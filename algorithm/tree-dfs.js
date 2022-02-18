/**
 * tree 深度优先遍历
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
const dfs = (data) => {
    console.log(data.value);
    data.children.forEach(dfs)
}
dfs(data)