function throttle(fn,timeout){
    let timer = null;
    let pre = null;
    return function (){
        let now = Date.now();
        const context = this;
        const args = [...arguments]
        if(pre===null) pre = now;
        if(now-pre>=timeout){
            fn.apply(context,args)
            pre = null;
        }else{
            clearTimeout(timer)
            timer = setTimeout(()=>{
                fn.apply(context,args)
            },timeout)
        }
    }
}