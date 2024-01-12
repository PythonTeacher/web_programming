// Basic Routing
var express = require("express");
const routes = require("./routes");

var app = express();

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(3000, function () {
  console.log("Server running at http://127.0.0.1:3000");
});

// 바디파서 설정
app.use(bodyParser.urlencoded({ extended: false }));

// 정적파일 설정
app.use(express.static("public"));

// 라우팅 핸들러 모듈 분리
app.use("/", routes);
