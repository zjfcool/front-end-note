/**
 * 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
    示例 1:

    输入: s = "abcabcbb"
    输出: 3 
    解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
    示例 2:

    输入: s = "bbbbb"
    输出: 1
    解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
    示例 3:

    输入: s = "pwwkew"
    输出: 3
    解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
         请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
    示例 4:

    输入: s = ""
    输出: 0
 */

function lengthOfLongestSubstring(str) {
    let arr = []
    for (let i = 0; i < str.length; i++) {
        arr[i] = []
        arr[i].push(str[i])
        for (let j = i + 1; j < str.length; j++) {
            if (arr[i].includes(str[j])) {
                break
            } else {
                arr[i].push(str[j])
            }
        }
    }
    let max = 0
    arr.forEach(item => max = Math.max(max, item.length))
    return max;
}

console.log(lengthOfLongestSubstring('bbbbb'))
console.log(lengthOfLongestSubstring('abcabcbb'))
console.log(lengthOfLongestSubstring('pwwkew'))
