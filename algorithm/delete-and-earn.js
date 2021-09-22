/**
 * 给你一个整数数组 nums ，你可以对它进行一些操作。
 * 每次操作中，选择任意一个 nums[i] ，删除它并获得 nums[i] 的点数。之后，你必须删除 所有 等于 nums[i] - 1 和 nums[i] + 1 的元素。
 * 开始你拥有 0 个点数。返回你能通过这些操作获得的最大点数。
 * 输入：nums = [3,4,2]
 * 输出：6
 * 解释：
 * 删除 4 获得 4 个点数，因此 3 也被删除。
 * 之后，删除 2 获得 2 个点数。总共获得 6 个点数。
 */

function deleteAndEarn(nums) {
    let max = 0;
    for (let i = 0; i < nums.length; i++) {
        max = Math.max(max, nums[i]);
    }
    let arr = new Array(max + 1).fill(0)
    for (let v of nums) {
        arr[v] += v;
    }
    return rab(arr)
}

function rab(arr) {
    const len = arr.length;
    if (len === 1) return arr[0]
    if (len === 2) return Math.max(...arr);
    let first = arr[0], second = arr[1];
    for (let i = 2; i < len; i++) {
        let tmp = second;
        second = Math.max(first + arr[i], second)
        first = tmp
    }
    return second;
}

console.log(deleteAndEarn([3, 4, 2]))