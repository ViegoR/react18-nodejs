"use strict";

var express = require("express");

var router = express.Router();

var mainObj = require("./routerhandle/hand");

router.post("/login", mainObj.login);
router.post("/home/menu", mainObj.menu);
router.post("/home/pro", mainObj.pro);
router.post("/home/addpro", mainObj.addpro);
module.exports = router;