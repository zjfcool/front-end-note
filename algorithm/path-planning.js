/**
 * m*n的格子中走上角到右下角一共有多少种路径，只能向右，向下移动
 */

function pathPlanningCount(m, n) {
    if (m === 1 || n === 1) {
        return 1;
    }
    return pathPlanningCount(m - 1, n) + pathPlanningCount(m, n - 1)
}
function pathPlanningCount(m, n) {
    let dp = new Array(m).fill([])
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i === 0 || j === 0) {
                dp[i][j] = 1;
            }
            else {
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
            }
        }
    }
    return dp[m - 1][n - 1]
}

console.log(pathPlanningCount(10, 10))