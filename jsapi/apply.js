Function.prototype.myApply = function(){
    let args = [...arguments];
    const fn = Symbol();
    const context = args.shift()
    context[fn] = this;
    const result = context[fn](args)
    delete context[fn]
    return result
}
function hello (){
    console.log(this.name)
}
// global.name = 'global'
let name = 'global'
let obj = {
    name:"obj"
}
hello()
hello.apply(obj)