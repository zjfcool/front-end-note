/**
 * 给你一个含 n 个整数的数组 nums ，其中 nums[i] 在区间 [1, n] 内。请你找出所有在 [1, n] 范围内但没有出现在 nums 中的数字，并以数组的形式返回结果
 */

function getDisappearedArray(nums) {
    let res = []
    let all = []
    for (let i = 0; i < nums.length; i++) {
        all[nums[i] - 1] = true;
    }
    for (let j = 0; j < nums.length; j++) {
        if (!all[j]) res.push(j + 1)
    }
    return res;
}

function getDisappearedArray2(nums) {
    let res = []
    let current = 0;
    for (let i = 0; i < nums.length; i++) {
        res[nums[i] - 1] = true
    }
    for (let i = 0; i < nums.length; i++) {
        if (res[i] === void 0) {
            res[current++] = i + 1;
        }
    }
    res.length = current;
    return res
}

function getDisappearedArray3(nums) {
    let res = []
    for (let i = 0; i < nums.length; i++) {
        if (!nums.includes(i + 1)) res.push(i + 1)
    }
    return res;
}

let a = [1, 3, 4, 2, 4, 5, 6, 7, 4, 1, 1]
console.log(getDisappearedArray(a), getDisappearedArray2(a), getDisappearedArray3(a))