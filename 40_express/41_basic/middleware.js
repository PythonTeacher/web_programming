// 1. 어플리케이션 (뼈대)
// 익스프레스 함수를 통해 인스턴스를 만들 수 있는데 그것을 어플리케이션이라 한다.
// 서버에 필요한 기능인 미들웨어를 어플리케이션에 추가한다.

// 2. 미들웨어 (뼈대에 들어갈 추가적으로 필요한 기능들)
// 미들웨어 함수는 요청, 응답, 다음 미들웨어 함수에 대한 액세스 권한을 갖는 함수 (req, res, next)
// 미들웨어의 로드 순서는 중요하며, 먼저 로드되는 미들웨어 함수가 먼저 실행됩니다.
// next() : 다음 미들웨어 함수에 요청을 전달

var express = require("express");
const moment = require("moment");
var app = express();

app.listen(3000, function () {
  console.log("Server running at http://127.0.0.1:3000");
});

// next : 다음 미들웨어 함수 전달
const mw1 = (req, res, next) => {
  console.log("첫번째 미들웨어");
  next();
};

const mw2 = (req, res, next) => {
  console.log("두번째 미들웨어");
  next();
};

// 미들웨어는 순서가 중요
app.use(mw1);
app.use(mw2);

// 미들웨어 함수 정의
var myLogger = function (req, res, next) {
  console.log(
    `${req.method}, ${req.url}, ${moment().format("YYYY-MM-DD HH:mm:ss:SSS")}`
  );
  req.requestTime = Date.now();
  next();
};

app.use(myLogger);

// 1. 애플리케이션 레벨 미들웨어
// 미들웨어 함수 로드 : 루트 경로(/)로 라우팅하기 전에 myLogger 미들웨어 함수를 먼저 로드

app.get("/", function (req, res) {
  var responseText = "Requested at: " + req.requestTime + "";
  res.send(responseText);
});

app.get("/hello", function (req, res) {
  var responseText = "Requested at: " + req.requestTime + "";
  res.send(responseText);
});

// 2. 라우터 레벨 미들웨어

// 3. 기본 제공 미들웨어
app.use(express.static("public"));

// 4. 써드파티 미들웨어
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

// 5. 오류 처리 미들웨어
// 여기까지 내려왔다는 것은 위에서 처리가 되지 않은 것
app.use(function (req, res, next) {
  const error = new Error("없는 페이지입니다.");
  error.code = 404;
  next(error);
  //throw new Error("없는 페이지입니다.");
});

// 에러 처리 미들웨어
app.use(function (err, req, res, next) {
  //console.error(err.stack);
  console.error(err.code);
  console.error(err.message);
  //if (err.code) res.status(err.code);
  //else res.status(500);
  res.status(err.code || 500);
  //if (err.message) res.send(err.message);
  //else res.send("Internal Server Error");
  res.send(err.message || "Internal Server Error");
});
