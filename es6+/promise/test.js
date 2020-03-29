const Promise = require('./index')
const promise = new Promise((resolve,reject)=>{
    resolve('hello world')
    throw new Error('hhhh')
})
const promise2 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(2)
    },1000)
})
const promise3=10
promise.finally(res=>{
    console.log(res)
})
Promise.race([promise,promise2,promise3]).then(values=>{
    console.log(values)
},err=>{
    console.log(err)
})