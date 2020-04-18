// 自定义属性
const promisifyCustomSymbol = Symbol('util.promisify.custom')
const promisifyCustomArgsSymbol = Symbol('customPromisifyArgs')
promisify.custom = promisifyCustomSymbol;
promisify.customArgs = promisifyCustomArgsSymbol;
function promisify(original){
    if(typeof original !== 'function') {
        throw 'original not a function'
    }
    const customArgs = original[promisifyCustomArgsSymbol];
    if(original[promisifyCustomSymbol]){
        const fn = original[promisifyCustomSymbol];
        if(typeof fn !== 'function'){
            throw new Error('The promisifyCustomSymbol not a function')
        }
        return Object.defineProperty(fn,promisifyCustomSymbol,{
            value:fn,
            enumerable:false,
            writable:false,
            configurable:true
        })
    }
    return function(...args){
        return new Promise((resolve,reject)=>{
            try{
                original.call(null,...args,(err,...result)=>{
                    if(err) {
                        reject(err)
                    }else{
                        if(customArgs !== undefined && customArgs.length>1){
                            const obj = {}
                            for(let i =0;i<customArgs.length;i++){
                                obj[customArgs[i]]=result[i]
                            }
                            resolve(obj)
                        }else{
                            resolve(result[0])
                        }
                    }
                    

                })
            }catch(err){
                reject(err)
            }
            
        })
    }
}
module.exports = promisify