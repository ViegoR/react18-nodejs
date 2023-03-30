const express=require("express")
const app=express()


//注册解析请求体的中间件
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//注册cors
const cors=require("cors")
app.use(cors())




const router =require("./router")
app.use("/api",router)


//运行服务器
app.listen(8080,()=>{
    console.log("运行服务器8080");
})