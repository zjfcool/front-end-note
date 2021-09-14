/**
 * 找出数组中的最长前缀
 * Example1: i:["flower","flow","flight"];o:"fl";
 * Example2: i:["dog","cat","car"];o:""
 * 注意：所有输入都是小写字母a-z
 */

/**
 * 解题思路：
 * 1.找出最短字符串
 * 2.确定了最长公共字符串前缀的长度是在0-minLength之间
 * 3.采用二分查找的方法
 */
function isCommonPrefix(inputs, middle) {
    const prefix = inputs[0].substring(0, middle);
    for (let i = 1; i < inputs.length; i++) {
        if (!inputs[i].startsWith(prefix)) return false
    }
    return true;
}
function longestCommonPrefix(inputs) {
    if (inputs.length === 0) return ''
    if (inputs.length === 1) return inputs[0]
    let minLength = Number.MAX_VALUE;
    for (let i = 0; i < inputs.length; i++) {
        minLength = Math.min(minLength, inputs[i].length)
    }
    let low = 0;
    let high = minLength;
    while (low <= high) {
        let middle = (high + low) >> 1;
        if (isCommonPrefix(inputs, middle)) low = middle + 1;
        else high = middle - 1;
    }
    return inputs[0].substring(0, (low + high) >> 1)
}
console.log(longestCommonPrefix(["flower", "flow", "flooo"])) // flo
console.log(longestCommonPrefix(["dog", "cat", "car"])) // ''

/**
 * Tire 
 */

function TireNode(val) {
    this.value = val
    this.children = []
    this.isWord = false;
}
function Tire() {
    this.root = new TireNode(null)
}
function computeIndex(c) {
    return c.charCodeAt(0) - 'a'.charCodeAt(0)
}

Tire.prototype.insert = function (word) {
    let ws = this.root;
    for (let i = 0; i < word.length; i++) {
        const current = computeIndex(word[i]);
        if (!ws.children[current]) {
            ws.children[current] = new TireNode(word[i]);
        }
        ws = ws.children[current]
    }
    ws.isWord = true;
}
Tire.prototype.search = function (word) {
    let ws = this.root;
    for (let i = 0; i < word.length; i++) {
        const current = computeIndex(word[i])
        if (!ws.children[current]) return false
        ws = ws.children[current]
    }
    return ws.isWord;
}
Tire.prototype.startsWith = function (prefix) {
    let ws = this.root;
    for (let i = 0; i < prefix.length; i++) {
        const current = computeIndex(prefix[i])
        if (!ws.children[current]) return false;
        ws = ws.children[current]
    }
    return true;
}

Tire.prototype.isCommonPrefix = function (inputs) {
    for (let i = 0; i < inputs.length; i++) {
        this.insert(inputs[i])
    }
    return commonPrefix(this.root.children)
}
function commonPrefix(arr, prefix = '') {
    const ret = arr.filter(item => item)

    if (ret.length === 1) {
        prefix += ret[0].value;
        return commonPrefix(ret[0].children, prefix)
    }
    return prefix;
}
const tire = new Tire()
console.log(tire.isCommonPrefix(["flower", "flow", "flooo"]))