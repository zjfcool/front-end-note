/**
 * 在一条环路上有 N 个加油站，其中第 i 个加油站有汽油 gas[i] 升。
 * 你有一辆油箱容量无限的的汽车，从第 i 个加油站开往第 i+1 个加油站需要消耗汽油 cost[i] 升。你从其中的一个加油站出发，开始时油箱为空。
 * 如果你可以绕环路行驶一周，则返回出发时加油站的编号，否则返回 -1。
 */
function startIndex(gas, cost) {
    let delta = 0;
    let total = 0;
    const len = gas.length;
    let start = 0;
    for (let i = 0; i < len; i++) {
        total += gas[i];
        total -= cost[i]
        delta += gas[i]
        delta -= cost[i]
        while (delta < 0) {
            delta = 0;
            start += 1;
        }
    }
    return total >= 0 ? start : -1
}
function getIndex(index, n) {
    if (index > n - 1) {
        return index - n;
    }
    return index;
}
function startIndex2(gas, cost) {
    let delta = 0;
    let len = gas.length;
    for (let i = 0; i < len; i++) {
        delta += gas[i]
        delta -= cost[i]
        let count = 0;
        while (delta >= 0) {
            count++;
            if (count === len) return i;
            delta += gas[getIndex(count + i, len)]
            delta -= cost[getIndex(count + i, len)]
        }
        delta = 0;
    }
    return -1;
}
const gas = [1, 2, 3, 4]
const cost = [2, 3, 2, 3]
console.log(startIndex(gas, cost))
console.log(startIndex2(gas, cost))
