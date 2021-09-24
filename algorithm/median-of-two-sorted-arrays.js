/**
 * 给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数 。
 * 示例 1：

    输入：nums1 = [1,3], nums2 = [2]
    输出：2.00000
    解释：合并数组 = [1,2,3] ，中位数 2
    示例 2：

    输入：nums1 = [1,2], nums2 = [3,4]
    输出：2.50000
    解释：合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5
    示例 3：

    输入：nums1 = [0,0], nums2 = [0,0]
    输出：0.00000
    示例 4：

    输入：nums1 = [], nums2 = [1]
    输出：1.00000
    示例 5：

    输入：nums1 = [2], nums2 = []
    输出：2.00000
 */
// 先合并成有序数组，再找中位数
function findMedianSortedArrays(nums1, nums2) {
    let m = nums1.length, n = nums2.length;
    let arr = []; let start = 0;
    for (let i = 0; i < m; i++) {
        let a = nums1[i]
        arr.push(a)
        for (let j = start; j < n; j++) {
            if (a > nums2[j]) { arr.splice(arr.length - 1, 0, nums2[j]); start = j + 1; }
            else break;
        }
    }
    if (start < n) {
        arr = arr.concat(nums2.slice(start))
    }
    let len = arr.length;
    let middle = Math.floor(len / 2);
    if (len % 2 === 0) {
        return (arr[middle] + arr[middle - 1]) / 2
    } else {
        return arr[middle]
    }
}
console.log(findMedianSortedArrays([1, 2], [3, 4]))
console.log(findMedianSortedArrays([0, 0], [0, 0]))
console.log(findMedianSortedArrays([], [1]))
console.log(findMedianSortedArrays([1], []))

function findMedianSortedArrays2(nums1, nums2) {
    let m = nums1.length, n = nums2.length;
    if (m < n) {
        findMedianSortedArrays2(nums2, nums1)
    }
    let left = 0, right = m, median1 = 0, median2 = 0;
    while (left <= right) {
        let i = Math.floor((left + right) / 2)
        let j = Math.floor((m + n + 1) / 2 - i)
        let num_l1 = i === 0 ? Number.MIN_VALUE : nums1[i - 1];
        let num_l2 = j === 0 ? Number.MIN_VALUE : nums2[j - 1];
        let num_r1 = i === m ? Number.MAX_VALUE : nums1[i];
        let num_r2 = j === n ? Number.MAX_VALUE : nums2[j]
        if (num_l1 < num_r2) {
            median1 = Math.max(num_l1, num_l2)
            median2 = Math.min(num_r1, num_r2)
            left = i + 1;
        } else {
            right = i - 1;
        }
    }
    return (m + n) % 2 == 0 ? (median1 + median2) / 2.0 : median1;
}

console.log(findMedianSortedArrays2([1, 2], [3, 4]))
console.log(findMedianSortedArrays2([0, 0], [0, 0]))
console.log(findMedianSortedArrays2([], [1]))
console.log(findMedianSortedArrays2([1], []))