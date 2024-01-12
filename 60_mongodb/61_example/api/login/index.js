const express = require("express");
const router = express.Router();
const ctrl = require("./login.ctrl");

// 라우팅 설정
router.post("/signup", ctrl.signup); // 회원가입
router.post("/login", ctrl.login); // 로그인
router.post("/logout", ctrl.logout); // 로그아웃

module.exports = router;
