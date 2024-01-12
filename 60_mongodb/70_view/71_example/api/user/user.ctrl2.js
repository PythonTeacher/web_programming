var UserModel = require("../../models/user2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// 로그인페이지 보여주기
const showLoginPage = (req, res) => {
  res.render("user/login");
};

// 회원가입페이지 보여주기
const showSignupPage = (req, res) => {
  res.render("user/signup");
};

// 인증처리 하기
const checkAuth = (req, res, next) => {
  //모든 template에서 보여지는 값이 있는 경우 res.locals에 저장
  res.locals.user = null;

  // 1. 쿠키에서 토큰을 가져옴
  const token = req.cookies.x_auth;

  if (!token) {
    if (
      req.url === "/" ||
      req.url === "/api/user/signup" ||
      req.url === "/api/user/login"
    )
      return next();
    else return res.render("user/login");
  }

  // 2. JWT로 토큰을 복호화한 후 user를 찾음
  // _id + secretKey => verify로 찾으면 _id만 넘어옴
  jwt.verify(token, "secretKey", (err, _id) => {
    if (err) {
      res.clearCookie("x_auth");
      return res.render("user/login"); // 유효하지 않은 토큰인 경우
    }
    // _id로 user를 찾은 후 쿠키에서 가져온 토큰과 db에 저장된 토큰이 일치하는지 확인
    UserModel.findOne({ _id, token }, (err, user) => {
      if (err) return res.status(500).send("인증 시 오류2");
      if (!user) return res.render("user/login");
      res.locals.user = { name: user.name, role: user.role };
      next();
    });
  });
};

// 회원가입
// - 성공 : 201 응답, 생성된 User 객체 반환 (201 : Created)
// - 실패 : 입력값 누락 시 400 반환 (400 : Bad Request)
//          userId가 중복된 경우 409 반환 (409 : Conflict)
const signup = (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name)
    return res.status(400).send("필수값이 입력되지 않았습니다.");

  UserModel.findOne({ email }, (err, result) => {
    if (err) return res.status(500).send("회원가입 시 오류가 발생했습니다.");
    if (result) return res.status(409).send("이미 사용중인 E-mail입니다.");

    // bcrypt : 단방향 해시 함수
    // salt 생성 -> hash 단방향 암호화
    const saltRounds = 10; // salt 자릿수
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) return res.status(500).send("암호화 시 오류 발생");

      const user = new UserModel({ email, password: hash, name });
      user.save((err, result) => {
        if (err)
          return res.status(500).send("회원가입 시 오류가 발생했습니다.");
        res.status(201).json(result);
      });
    });
  });
};

// 로그인
// - 성공 : id, pwd값이 일치하면 로그인 성공
// - 실패 : id, pwd값이 입력되지 않은 경우 400 응답 (400: Bad Request)
//          id, pwd가 일치하지 않은 경우 404 응답
const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).send("필수값이 입력되지 않았습니다.");

  // id, pwd 확인
  UserModel.findOne({ email }, (err, user) => {
    if (err) return res.status(500).send("로그인 시 오류가 발생했습니다.");
    if (!user) return res.status(404).send("가입되지 않은 계정입니다.");

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).send("비밀번호 암호화 처리 시 오류");
      if (!isMatch)
        return res.status(404).send("비밀번호가 올바르지 않습니다.");

      // 비밀번호가 맞다면 signed 토큰 생성 발급 (jsonwebtoken)
      // jwt.sign(payload, secretKey)
      const token = jwt.sign(user._id.toHexString(), "secretKey"); // user._id + 'secretKey' -> 토큰 생성

      UserModel.findByIdAndUpdate(user._id, { token }, (err, result) => {
        if (err) return res.status(500).send("로그인 시 에러 발생");
        // 토큰 저장 : 쿠키, local storage..
        // httpOnly : http 통신하는 경우에만 전송 (javascript로 쿠키정보를 얻지 못하도록 함)
        res.cookie("x_auth", token, { httpOnly: true });
        res.json(result);
      });
    });
  });
};

const logout = (req, res) => {
  // 1. 쿠키에서 토큰을 가져옴
  const token = req.cookies.x_auth;
  if (!token) return res.render("user/login");

  jwt.verify(token, "secretKey", (err, _id) => {
    if (err) return res.status(500).send("로그아웃 시 오류");
    // _id로 user를 찾은 후 token값 clear
    UserModel.findByIdAndUpdate(_id, { token: "" }, (err, result) => {
      if (err) return res.status(500).send("로그아웃 시 오류");
      res.clearCookie("x_auth");
      res.redirect("/");
    });
  });
};

module.exports = {
  showLoginPage,
  showSignupPage,
  signup,
  login,
  logout,
  checkAuth,
};
