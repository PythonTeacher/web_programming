var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var user = require("./api/user"); // index.js는 생략 가능
var music = require("./api/music");

var app = express();

app.listen(3000, () => {
  console.log("Server is running on 3000 port");
});

// 미들웨어 설정
app.use(logger("dev"));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// 라우팅 핸들러 모듈 설정
app.use("/users", user);
app.use("/music", music);

//module.exports = app;
