const http = require('http')

function compose(middlewares){
    return function(ctx){
        function dispatch(n){
            const middleware = middlewares[n];
            try{
                return Promise.resolve(
                    middleware(ctx,dispatch.bind(null,n+1))
                )
            }catch(err){
                return Promise.reject(err)
            }
        }
        dispatch(0)
    }
}
class LikeKoa2 {
    constructor(){
        this.middlewares = []
    }
    use(middleware){
        this.middlewares.push(middleware)
    }
    createContext(req,res){
        const ctx ={
            req,
            res
        }
        return ctx;
    }
    callback(){
        return (req,res)=>{
            const ctx = this.createContext(req,res);
            const fn = compose(this.middlewares);
            fn(ctx);
        }
    }
    listen(...args){
        const server = http.createServer(this.callback())
        server.listen(...args)
    }
}
module.exports = LikeKoa2;