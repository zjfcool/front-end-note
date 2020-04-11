const express = require('./index.js')
const app = express()

// app.use(express.json)
app.use((req,res,next)=>{
    console.log('kaishi')
    next()
})
app.get('/api',(req,res,next)=>{
    console.log('api')
    res.json({
        api:"api"
    })
})
app.post('/api',(req,res,next)=>{
    console.log('post')
    res.json({hello:"sfdf"})
})
app.listen(3000,()=>{
    console.log('server port 3000')
})