const promisify = require('./promisify')
const fs = require('fs')
// fs.readFile[promisify.custom] = (a,b)=>{
//     return Promise.resolve(a,b)
// }
fs.readFile[promisify.customArgs] = ['value','name'];
const readFile = promisify(fs.readFile)

readFile('./hello.txt','utf-8').then(res=>{
    console.log(res)
})