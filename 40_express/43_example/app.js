var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

// 미들웨어 설정
app.use(logger("dev"));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// 정적파일 설정
app.use(express.static("public"));

// 라우팅 핸들러 모듈 설정
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
