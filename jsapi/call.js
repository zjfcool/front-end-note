Function.prototype.myCall = function(){
    const args = [...arguments]
    const context = args.shift()
    const fn = Symbol()
    context[fn] = this;
    const result = context[fn](...args)
    delete context[fn]
    return result;
}

function hello(a,b){
    console.log(this.name,a,b)
}
const obj = {
    name:"hello"
}

hello.myCall(obj,1,2)