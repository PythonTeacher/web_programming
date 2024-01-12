var UserModel = require("../../models/user");
var crypto = require("crypto"); // 암호화 모듈 추가

// 회원가입
// - 성공 : 201 응답, 생성된 User 객체 반환 (201 : Created)
// - 실패 : 입력값 누락 시 400 반환 (400 : Bad Request)
//          userId가 중복된 경우 409 반환 (409 : Conflict)
const signup = (req, res) => {
  const name = req.body.name;
  const userId = req.body.userId;
  const userPwd = req.body.userPwd;
  if (!userId || !userPwd || !name) return res.status(400).end();

  UserModel.findOne({ userId }, (err, result) => {
    if (err) return res.status(500).end();
    if (result) return res.status(409).end();
    const salt = Math.round(new Date().valueOf() * Math.random()) + "";
    const hashPassword = crypto
      .createHash("sha512")
      .update(userPwd + salt)
      .digest("hex");
    UserModel.create(
      { name, userId, userPwd: hashPassword, salt },
      (err, result) => {
        if (err) return res.status(500).end();
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
  const userId = req.body.userId;
  const userPwd = req.body.userPwd;

  if (!userId || !userPwd) return res.status(400).end();

  // id, pwd 확인
  UserModel.findOne({ userId }, (err, result) => {
    if (err) return res.status(500).end();
    if (!result) return res.status(404).end();
    const dbPwd = result.userPwd;
    const salt = result.salt;
    const hashPassword = crypto
      .createHash("sha512")
      .update(userPwd + salt)
      .digest("hex");

    if (dbPwd !== hashPassword) return res.status(404).end();
    // 세션이 있는지 체크한 후 세션 저장
    if (!req.session.user) {
      req.session.user = {
        userId,
        name: result.name,
        authorized: true,
      };
    }
    console.log(result);
    res.json(result);
  });
};

const logout = (req, res) => {
  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) return res.status(500).end();
      return res.status(200).end();
    });
  } else {
    return res.status(200).end();
  }
};

module.exports = { signup, login, logout };
