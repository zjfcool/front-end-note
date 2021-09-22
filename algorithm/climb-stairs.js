/**
 * 爬楼梯
 * 爬楼梯每次可以爬1个台阶或者2个台阶，有多少种爬到顶层的方法
 */
// dynamic programming
function climbStairs(n) {
    let dp = new Array(n + 1)
    dp[0] = 1;
    dp[1] = 2;
    for (let i = 2; i < n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2]
    }
    return dp[n - 1]
}
console.log(climbStairs(4))