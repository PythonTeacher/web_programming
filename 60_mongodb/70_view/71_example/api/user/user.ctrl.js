var UserModel = require("../../models/user");
var crypto = require("crypto"); // 암호화 모듈 추가

// 로그인페이지 보여주기
const showLoginPage = (req, res) => {
  res.render("user/login");
};

// 회원가입페이지 보여주기
const showSignupPage = (req, res) => {
  res.render("user/signup");
};

// 로그인여부 체크하기
const checkAuth = (req, res, next) => {
  if (!req.session.name) {
    return res.render("user/login");
  }
  next();
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

    const salt = Math.round(new Date().valueOf() * Math.random()) + "";
    const hashPassword = crypto
      .createHash("sha512")
      .update(password + salt)
      .digest("hex");

    UserModel.create(
      { email, password: hashPassword, name, salt },
      (err, result) => {
        if (err)
          return res.status(500).send("회원가입 시 오류가 발생했습니다.");
        res.status(201).json(result);
      }
    );
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
  UserModel.findOne({ email }, (err, result) => {
    if (err) return res.status(500).send("로그인 시 오류가 발생했습니다.");
    if (!result) return res.status(404).send("가입되지 않은 계정입니다.");
    const dbPwd = result.password;
    const salt = result.salt;
    const hashPassword = crypto
      .createHash("sha512")
      .update(password + salt)
      .digest("hex");

    if (dbPwd !== hashPassword)
      return res.status(404).send("비밀번호가 올바르지 않습니다.");
    // 세션이 있는지 체크한 후 세션 저장
    if (!req.session.name) {
      req.session.name = result.name;
    }
    res.json(result);
  });
};

const logout = (req, res) => {
  if (req.session.name) {
    req.session.destroy();
  }
  //res.render("index", { title: "MyApp", name: "" });
  res.redirect("/");
};

module.exports = {
  showLoginPage,
  showSignupPage,
  signup,
  login,
  logout,
  checkAuth,
};
