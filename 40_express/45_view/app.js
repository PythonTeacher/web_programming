// express view engine
// pug, hbs, nunjucks(눈적스)
var express = require("express");
const nunjucks = require("nunjucks");
const logger = require("morgan");
const bodyParser = require("body-parser");

const music = require("./routes/music");
const admin = require("./routes/admin");
const contact = require("./routes/contact");

var app = express();

// 눈적스 셋팅
nunjucks.configure("template", {
  autoescape: true, // 보안상 true로 하기, XSS 막기
  express: app,
});

// 미들웨어 셋팅
app.use(logger("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 정적파일 (이미지, css, js)
app.use("/upload", express.static("upload"));

app.use((req, res, next) => {
  app.locals.isLogin = false;
  app.locals.reqUrl = req.url;
  next();
});

app.get("/", (req, res) => res.send("Hello World!"));

function vipMiddleware(req, res, next) {
  console.log("최우선 미들웨어");
  next();
}

// 라우팅 핸들러 모듈 분리
app.use("/music", music);
app.use("/admin", vipMiddleware, admin);
app.use("/contact", contact);

// routing이 없을 경우
app.use((req, res, next) => {
  res.status(404).render("common/404.html");
});

// 에러 핸들링
app.use((err, req, res, next) => {
  res.status(500).render("common/500.html");
});

app.listen(3000, function () {
  console.log("Server running at http://127.0.0.1:3000");
});
