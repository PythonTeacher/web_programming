const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");

const app = express();

// 로깅 설정
app.use(logger("dev"));

// 바디파서 설정
app.use(bodyParser.urlencoded({ extended: false }));

// 정적파일 설정
app.use(express.static("public"));

// 라우팅 핸들러 모듈 분리
app.use("/", require("./routes")); // app.use(require("./routes")); 도 가능

module.exports = app;
