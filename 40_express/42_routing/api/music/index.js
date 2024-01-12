// express.Router 클래스를 사용하면 마운팅 가능한 핸들러 모듈을 작성할 수 있음
// 라우터를 모듈로 작성한 후, app.use로 특정 route 경로에 라우터 모듈을 마운트 해줌

//const express = require("express");
//const router = express.Router();

const { Router } = require("express");
const router = Router(); // 라우터 인스턴스 생성

// 라우팅 설정
// 목록조회
router.get("/", (req, res) => {
  res.send("music list");
});

// 상세조회
router.get("/:id", (req, res) => {
  res.send(`music detail : ${req.params.id}`);
});

// 생성
router.post("/", (req, res) => {
  res.send("music create");
});

// 수정
router.put("/:id", (req, res) => {
  res.send(`music update : ${req.params.id}`);
});

// 삭제
router.delete("/:id", (req, res) => {
  res.send(`music delete : ${req.params.id}`);
});

module.exports = router;
