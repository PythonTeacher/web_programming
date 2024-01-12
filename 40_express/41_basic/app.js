// express 사이트 - getting started
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");

const app = express();
const port = 3000;

// GET방식 : 데이터를 URL 끝에 ? 뒤의 쿼리스트링을 통해 데이터 전송
//           URL데이터는 헤더에 들어가므로 헤더로 전송, 길이 제한 있음
// POST방식 : 데이터를 HTTP 메세지의 Body에 담아 전송, 길이 제한 없음
// GET은 단순 조회 또는 Link 시 사용, POST는 서버 값이나 상태를 바꾸기 위해 사용
// 채용시스템 : company.com/apply?id=10001

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

// morgan : 요청메소드 + path + 응답속도 + 응답바이트
app.use(logger("dev")); // dev < short < common < combined

// http://127.0.0.1:3000/
app.get("/", (req, res) => res.send("Hello World!"));
/*app.get("/", function (req, res) {
    res.send("<h1>Hello, Express</h1>");
});*/

// http://127.0.0.1:3000/hello
/*app.get("/hello", function (req, res) {
  res.send("<h1>안녕하세요, 홍길동님</h1>");
});*/

// query string 방식 처리
// http://127.0.0.1:3000/music?title=좋은날&singer=아이유
// URL은 아스키코드로만 전송이 가능하므로, 그외의 문자는 %와 16진수 문자로 조합하여 인코딩하여 전송됨
// query로 꺼내면 자동으로 디코딩까지 해줌
app.get("/music", function (req, res) {
  //throw new Error("GET 처리 시 오류 발생");
  const title = req.query.title;
  const singer = req.query.singer;
  //res.status(500); // 상태코드
  //res.set("Content-Type", "text/plain");
  res.send("query string(get) -> title:" + title + ", singer:" + singer);
});

// 없는 URL을 요청할 경우 에러 확인

// URL 파라미터 방식 또는 Route 파라메터 (RESTFul 서비스 처리)
// http://127.0.0.1:3000/music/좋은날/아이유
app.get("/music/:title/:singer", function (req, res) {
  //console.log("req.params:", req.params);
  var title = req.params.title;
  var singer = req.params.singer;

  res.send("url parameter(get) -> title:" + title + ", singer:" + singer);
});

// form으로 전달되는 바디메시지를 처리하는 바디파서 설정
// true: qs(확장모듈), false: querystring(기본모듈)
app.use(bodyParser.urlencoded({ extended: false }));

// 바디 메시지가 JSON인 요청을 분석하는 바디파서 설정
//app.use(bodyParser.json());

// 정적 파일 위치 설정
// http://127.0.0.1:3000/hello.html -> public/hello.html
app.use(express.static("public"));

// 가상 경로 설정
// http://127.0.0.1:3000/static/hello.html
//app.use('/static', express.static('public'));

// post 방식 처리
// http://127.0.0.1:3000/music
// 브라우저에서 알아서 body 메세지를 인코딩하여 보내주고, 디코딩까지 해줌
// content type : x-www-form-urlencoded
app.post("/music", function (req, res) {
  console.log("req.body:", req.body);
  var title = req.body.title;
  var singer = req.body.singer;
  res.send("urlencoded(post) -> title:" + title + ", singer:" + singer);
});

// URL 파라미터 방식 (RESTFul 서비스 처리)
// http://127.0.0.1:3000/좋은날/아이유
app.post("/music/:title/:singer", function (req, res) {
  console.log("req.params:", req.params);
  var title = req.params.title;
  var singer = req.params.singer;

  res.send("url parameter(post) -> title:" + title + ", singer:" + singer);
});

// 여기까지 내려왔다는 것은 위에서 처리가 되지 않은 것
app.use(function (req, res, next) {
  console.log("asdf");
  const error = new Error("없는 페이지입니다.");
  error.code = 404;
  next(error);
  //throw new Error("없는 페이지입니다.");
});

// 오류 처리 미들웨어
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
