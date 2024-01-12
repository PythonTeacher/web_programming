const express = require("express");
const router = express.Router();
const ctrl = require("./user.ctrl2");

// 라우팅 설정
router.get("/login", ctrl.showLoginPage); // 로그인페이지 보여주기
router.get("/signup", ctrl.showSignupPage); // 회원가입페이지 보여주기
router.get("/logout", ctrl.logout); // 로그아웃

router.post("/signup", ctrl.signup); // 회원가입
router.post("/login", ctrl.login); // 로그인

module.exports = router;
