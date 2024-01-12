var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
require("dotenv").config();
//const session = require("express-session"); // 세션 확장모듈 추가
const config = require("../config/key");
const userCtrl = require("./api/user/user.ctrl2");

var app = express();

// mongodb 연결
//mongoose.connect(process.env.MONGO_URI, {
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Database connected!!");
});

app.set("views", path.join(__dirname, "views"));
//app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 세션 미들웨어 등록
// secret : 쿠키를 임의로 변조하는 것을 방지, 이 값으로 세션을 암호화하여 저장
// resave : 세션을 언제나 저장할지 여부
// saveUninitialized : 세션이 저장되기 전에 uninitialized 상태로 만들어서 저장
//app.use(session({ secret: "my key", resave: false, saveUninitialized: true }));

app.use(userCtrl.checkAuth);

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/api", require("./api"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
