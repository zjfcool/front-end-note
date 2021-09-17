/**
 * 找出一个数组中出现次数最多的前K个数
 * Input: nums = [1,1,1,2,2,3], k = 2
 * Output: [1,2]
 * Example 2:
 * Input: nums = [1], k = 1
 * Output: [1]
 *
 */
function findTopK(nums, k) {
    let obj = {}; let arr = [];
    for (let i = 0; i < nums.length; i++) {
        if (!obj[nums[i]]) obj[nums[i]] = 1;
        else obj[nums[i]] += 1;
    }
    Object.entries(obj).forEach(([k, v]) => {
        if (!arr[v]) arr[v] = []
        arr[v].push(k)
    })
    arr = arr.filter(item => item).flat(Infinity)
    return arr.slice(arr.length - k, arr.length)
}
console.log(findTopK([1, 1, 1, 2, 2, 3], 2))
console.log(findTopK([1], 1))
