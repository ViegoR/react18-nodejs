
//注册数据库
const db=require("../mysql")


//登录验证密码的接口
exports.login=(req,res)=>{
    db.query("select * from users where username=?",req.body.username,(err,results)=>{
                const reqBody={}
                if(err){
                    console.log("出错了",err);
                    reqBody.status=404
                }else{
                    if(!results||results.length===0) {
                        reqBody.message="用户名不存在"
                        reqBody.status=300
                    }else{
                        if(results[0]&&results[0].password==req.body.password){
                            reqBody.message="请求成功"
                            reqBody.status=200
                            let userToken=new Date().getTime()
                            reqBody.token=userToken
                            db.query("update users set usertoken=? where username=?",[userToken,req.body.username],(error,success)=>{
                                console.log(1,"后台存储token成功");
                            })
                        }else{
                            reqBody.message="密码错误"
                            reqBody.status=301
                        }
                    }
                }
                res.send(reqBody)
            })
}


//获取菜单的接口
exports.menu=(req,res)=>{
    db.query("select * from users where username=?",req.body.username,(err,results)=>{
                const reqBody={}
                if(err){
                    console.log("出错了",err);
                    reqBody.status=404
                    res.send(reqBody)
                }else{
                    if(!results||results.length===0) {
                        reqBody.message="用户信息不存在"
                        reqBody.status=300
                        res.send(reqBody)
                    }else{
                        // let aaa=[
                        //     {key:'1',children:null,label:"首页"},
                        //     {key:'2',children:[
                        //       {key:'21',children:null,label:"品牌",path:"/home/pro"},
                        //       {key:'22',children:null,label:"平台属性",path:"/home/pla"},
                        //       {key:'23',children:[
                        //             {key:"231",children:null,label:"spua",path:"/home/spua"},
                        //             {key:"232",children:null,label:"spub",path:"/home/spub"}
                        //         ],label:"SPU"},
                        //       {key:'24',children:[
                        //             {key:"241",children:null,label:"skua",path:"/home/skua"},
                        //             {key:"242",children:null,label:"skub",path:"/home/skub"}
                        //       ],label:"SKU"}
                        //     ],label:"商品管理"}]
                        //     let bbb=JSON.stringify(aaa)
                        // console.log(bbb);
                        // db.query("update user_menu set menu=? where username=?",[bbb,req.body.username],(error,success)=>{
                        //     console.log(1,"存储成功");
                        // })
                        if(results[0]&&results[0].usertoken==req.body.usertoken){
                            db.query("select * from user_menu where username=?",req.body.username,(error,success)=>{
                                reqBody.resList=success[0].menu
                                reqBody.status=200
                                res.send(reqBody)
                            }) 
                        }else{
                            reqBody.message="用户信息不存在"
                            reqBody.status=301
                            res.send(reqBody)
                        }
                    }
                }
            })
}


//获取品牌的接口
exports.pro=(req,res)=>{
    db.query("select * from users where username=?",req.body.username,(err,results)=>{
                const reqBody={}
                if(err){
                    console.log("出错了",err);
                    reqBody.status=404
                    res.send(reqBody)
                }else{
                    if(!results||results.length===0) {
                        reqBody.message="用户信息不存在"
                        reqBody.status=300
                        res.send(reqBody)
                    }else{
                        if(results[0]&&results[0].usertoken==req.body.usertoken){
                            db.query("select * from pro ",(error,success)=>{
                                reqBody.message="请求成功"
                                reqBody.dataList=success
                                reqBody.status=200
                                res.send(reqBody)
                            }) 
                        }else{
                            reqBody.message="用户信息不存在"
                            reqBody.status=301
                            res.send(reqBody)
                        }
                    }
                }
            })
}


//新增品牌的接口
exports.addpro=(req,res)=>{
    db.query("insert into pro set ?",req.body,(err,results)=>{
                const reqBody={}
                if(err){
                    reqBody.message="新增失败"
                    reqBody.status=404
                    res.send(reqBody)
                }else{
                    reqBody.message="新增成功"
                    reqBody.status=200
                    res.send(reqBody)
                }
            })
}