// 라우팅
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");

const music = require("./api/music");
const contact = require("./api/contact");
const user = require("./api/user");

const app = express();
const port = 3000;

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

// 로깅 설정
app.use(logger("dev"));

// 바디파서 설정
app.use(bodyParser.urlencoded({ extended: false }));

// 정적파일 설정
app.use(express.static("public"));

//app.get("/", (req, res) => res.send("Hello World!"));

// 라우팅 모듈 분리
//app.use("/music", music);
//app.use("/contact", contact);
//app.use("/user", user);
app.use("/", require("./api"));

app.use(function (req, res, next) {
  const error = new Error("없는 페이지입니다.");
  error.code = 404;
  next(error);
});

// 오류 처리 미들웨어
app.use(function (err, req, res, next) {
  //console.error(err.code);
  //console.error(err.message);
  res.status(err.code || 500);
  res.send(err.message || "Internal Server Error");
});
