function deepClone(obj) {
  let ret = Array.isArray(obj) ? [] : {};
  if (typeof obj === "object" && typeof obj !== null) {
    for (let k in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, k)) {
        if (typeof obj[k] === "object" && typeof obj[k] !== null) {
          ret[k] = deepClone(obj[k]);
        } else {
          ret[k] = obj[k];
        }
      }
    }
  } else {
    ret = obj;
  }
  return ret;
}
const obj = {
  a: "hello",
  b: "ddd",
  c: {
    d: {
      name: "dd",
    },
  },
};
const a = deepClone(obj);
console.log(a);
a.a = "jj";
a.c.d.name = "hh";
console.log(a, obj);
