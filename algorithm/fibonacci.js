/**
 * 菲波那切数列
 * [1,1,2,3]
 * f(n) = f(n-1)+f(n-2)
 */
// 递归自顶向下
function fibonacci(n) {
    if (n == 1 || n === 2) {
        return 1
    }
    return fibonacci(n - 1) + fibonacci(n - 2)
}
// 动态规划自底而上
function fibonacci(n) {
    let arr = new Array(n + 1).fill(0);
    arr[1] = arr[2] = 1;
    for (let i = 3; i < n + 1; i++) {
        arr[i] = arr[i - 1] + arr[i - 2]
    }
    return arr[n]
}