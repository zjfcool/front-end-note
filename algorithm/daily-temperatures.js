/**
 * 请根据每日 气温 列表 temperatures ，请计算在每一天需要等几天才会有更高的温度。如果气温在这之后都不会升高，请在该位置用 0 来代替。
 * 输入: temperatures = [73,74,75,71,69,72,76,73]
 * 输出: [1,1,4,2,1,1,0,0]
 */

function dailyTemperature(temperatures) {
    let len = temperatures.length;
    let ret = [];
    for (let i = 0; i < len; i++) {
        ret[i] = 0
        for (let j = i + 1; j < len; j++) {
            if (temperatures[j] > temperatures[i]) {
                ret[i] = j - i;
                break;
            }
        }
    }
    return ret;
}
console.log(dailyTemperature([73, 74, 75, 71, 69, 72, 76, 73]))

function dailyTemperature2(temperatures) {
    let ret = []
    let stack = []
    for (let i = 0; i < temperatures.length; i++) {
        ret[i] = 0
        while (stack.length > 0 && temperatures[stack[stack.length - 1]] < temperatures[i]) {
            let j = stack.pop()
            ret[j] = i - j;
        }
        stack.push(i)
    }
    return ret;
}

console.log(dailyTemperature2([73, 74, 75, 71, 69, 72, 76, 73]))