var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var expressSession = require("express-session"); // 세션 확장모듈 추가

var user = require("./api/user");
var music = require("./api/music");
var login = require("./api/login");

var app = express();

// mongodb 연결
mongoose.connect("mongodb://localhost/example", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Database connected!!");
});

// view engine setup
//app.set("views", path.join(__dirname, "views"));
//app.set("view engine", "jade");

//app.set("views", path.join(__dirname, "views"));
//app.engine("html", require("ejs").renderFile);
//app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 세션 미들웨어 등록
app.use(
  expressSession({ secret: "my key", resave: true, saveUninitialized: true })
);

app.use("/user", user);
app.use("/music", music);
app.use("/", login);

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
