Function.prototype.myBind = function(){
    const args = [...arguments];
    const context = args.shift()
    const fn = this;
    return function (){
        return fn.apply(context,args.concat([...arguments]))
    }
}
let obj = {
    name:"hello"
}
function hello (){
    console.log(this.name)
}
hello.bind(obj)()