/**
 * 分组
 * 随机生成[-100,100]数组[1,2,-19,20...]
 * [[1,9],[-8,12]] 两个相加等于10
 */
function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function randomArr(num) {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(random(-100, 100));
  }
  return arr;
}
function group(sum) {
  let arr = randomArr(1000);
  let obj = {};
  let ret = [];
  arr.forEach((item) => {
    if (!obj[item]) obj[item] = [];
    obj[item].push(item);
  });
  arr.forEach((item) => {
    let result = sum - item;
    if (obj[result]) {
      obj[result].forEach((d) => {
        ret.push([item, d]);
      });
    }
  });
  return ret;
}
console.log(group(10));
