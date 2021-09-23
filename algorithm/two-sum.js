/**
 * 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
 * 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
 * 你可以按任意顺序返回答案。
 */
function twoNum(nums, target) {
    let ret = []
    for (let i = 0; i < nums.length; i++) {
        const a = nums[i], b = target - a;
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[j] === b) ret.push([i, j])
        }
    }
    return ret[0];
}
console.log(twoNum([2, 7, 11, 15], 9))
console.log(twoNum([3, 2, 4], 6))
console.log(twoNum([3, 3, 2, 4, 3], 6))
function twoNum2(nums, target) {
    let obj = {}
    for (let i = 0; i < nums.length; i++) {
        let a = nums[i], b = target - a;
        if (obj[b] >= 0) return [obj[b], i]
        obj[a] = i;
    }
    return [];
}
console.log(twoNum2([2, 7, 11, 15], 9))
console.log(twoNum2([3, 2, 4], 6))
console.log(twoNum2([3, 3, 2, 4, 3], 6))