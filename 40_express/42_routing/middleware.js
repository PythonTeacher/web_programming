var express = require('express');
var app = express();

app.listen(3000, function() {
    console.log('Server running at http://127.0.0.1:3000');
});

// 미들웨어 함수 정의
var myLogger = function (req, res, next) {
    console.log('LOGGED');
    req.requestTime = Date.now();
    next();
};

// 1. 애플리케이션 레벨 미들웨어
// 미들웨어 함수 로드 : 루트 경로(/)로 라우팅하기 전에 myLogger 미들웨어 함수를 먼저 로드
app.use(myLogger);

app.get('/', function (req, res) {
    var responseText = 'Requested at: ' + req.requestTime + '';
    res.send(responseText);
});

// 모든 HTTP 요청 처리
app.use('/user/:id', function (req, res, next) {
    console.log('Request Type:', req.method);
    next();
});

app.get('/user/:id', function (req, res, next) {
    res.send('GET 방식 호출');
});

// 2. 라우터 레벨 미들웨어

// 3. 오류 처리 미들웨어
// 여기까지 내려왔다는 것은 위에서 처리가 되지 않은 것
app.use(function(req, res, next) {
    var error = new Error();
    error.code = 500;
    error.message = '없는 페이지입니다';
    next(error);
});

// error handler
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send(err.message);
});

// 4. 기본 제공 미들웨어
app.use(express.static('public'));

// 5. 써드파티 미들웨어
//var bodyParser = require('body-parser');
//app.use(bodyParser.urlencoded({extended: false}));