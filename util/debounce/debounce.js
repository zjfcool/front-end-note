function debounce (fn,timeout) {
    let timer = null;
    return function(){
        const args = [...arguments]
        clearTimeout(timer)
        timer = setTimeout(()=>{
            fn.apply(this,args)
        },timeout)
    }
}