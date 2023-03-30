"use strict";

var express = require("express");

var app = express(); //注册解析请求体的中间件

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json()); //注册cors

var cors = require("cors");

app.use(cors());

var router = require("./router");

app.use("/api", router); //运行服务器

app.listen(8080, function () {
  console.log("运行服务器8080");
});