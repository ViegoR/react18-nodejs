const express=require("express")
const router=express.Router()

const mainObj=require("./routerhandle/hand")


router.post("/login",mainObj.login)


router.post("/home/menu",mainObj.menu)
router.post("/home/pro",mainObj.pro)
router.post("/home/addpro",mainObj.addpro)

module.exports=router