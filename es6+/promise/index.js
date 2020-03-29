
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'


// 对返回值x进行各种状态下的判断
function resolvePromise(promise2,x,resolve,reject){
    if(x===promise2) return reject(new TypeError('Chaning cycle detected for promise '));
    // 如果返回结果是一个promise
    if((x&&typeof x === 'object')|| typeof x === 'function'){
        let used;
        try {
            let then = x.then;
            if(typeof then === 'function'){
                then.call(x,y=>{
                    if(used) return;
                    used = true;
                    resolvePromise(promise2,y,resolve,reject)
                },r=>{
                    if(used) return
                    used = true;
                    reject(r)
                })
            }else{
                if(used) return;
                used = true;
                resolve(x)
            }
        }catch(err){
            if(used) return;
            used = true;
            reject(err)
        }
    }else{
        resolve(x)
    }
}

class Promise {
    constructor(executor) {
        this.status = PENDING;
        this.onFulfilledCallback = []
        this.onRejectedCallback = []
        let resolve = (value)=>{
            if(this.status === PENDING){
                this.status = FULFILLED;
                this.value = value
                this.onFulfilledCallback.forEach(cb=>cb())
            }
        }
        let reject = reason=>{
            if(this.status===PENDING){
                this.status = REJECTED;
                this.reason = reason;
                this.onRejectedCallback.forEach(cb=>cb())
            }
        }
        try{
            executor(resolve,reject)
        }catch(err){
            reject(err)
        }
    }
    then(onFulfilled,onRejected){
        // 值穿透
        onFulfilled = typeof onFulfilled === 'function'?onFulfilled:res=>res;
        onRejected = typeof onRejected === 'function'?onRejected:(err)=>{throw err};
        let promise2 = new Promise((resolve,reject)=>{
            if(this.status===FULFILLED){
                setTimeout(()=>{
                    try{
                        const x = onFulfilled(this.value)
                        resolvePromise(promise2,x,resolve,reject)
                    } catch(err){
                        reject(err)
                    }
                },0)
            }
            if(this.status===REJECTED){
                setTimeout(()=>{
                    try{
                        const x = onRejected(this.reason)
                        resolvePromise(promise2,x,resolve,reject)
                    }catch(err){
                        reject(err)
                    }
                },0)
            }
            if(this.status===PENDING){
                this.onFulfilledCallback.push(()=>{
                    setTimeout(()=>{
                        try{
                            const x = onFulfilled(this.value)
                            resolvePromise(promise2,x,resolve,reject)
                        }catch(err){
                            reject(err)
                        }
                    },0)
                })
                this.onRejectedCallback.push(()=>{
                    setTimeout(()=>{
                        try{
                            const x = onRejected(this.reason)
                            resolvePromise(promise2,x,resolve,reject)
                        }catch(err){
                            reject(err)
                        }
                    },0)
                })
            }
        })
        return promise2;
    }
    catch(errFn){
        return this.then(null,errFn)
    }
    finally(fn){
        return this.then(fn,fn)
    }
}
Promise.deferred = ()=>{
    let dfd = {}
    dfd.promise = new Promise((resolve,reject)=>{
        dfd.resolve = resolve;
        dfd.reject = reject;
    })
    return dfd;
}
function isPromise (p) {
    return p instanceof Promise
}
Promise.all = (promises)=>{
    return new Promise((resolve,reject)=>{
        let ret = [];
        let i = 0;
        function processPromise(index,value){
            ret[index] = value;
            if(++i === promises.length){
                resolve(ret)
            }
        }
        for(let i =0;i<promises.length;i++){
            if(isPromise(promises[i])){
                promises[i].then(data=>{
                    processPromise(i,data)
                },(err)=>{
                    reject(err)
                    return
                })
            }else{
                processPromise(i,promises[i])
            }
        }
    })
}
Promise.race = (promises)=>{
    return new Promise((resolve,reject)=>{
        for(let i=0;i<promises.length;i++){
            if(isPromise(promises[i])){
                promises[i].then(data=>{
                    return resolve(data)
                },err=>{
                    reject(err)
                    return;
                })
            }else{
               return resolve(promises[i])
            }
        }
    })
}

module.exports = Promise;