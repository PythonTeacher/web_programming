const { Router } = require("express");
const router = Router();

const music = require("./music");
const movie = require("./movie");
const contact = require("./contact");
const user = require("./user");

// api/index : 대분류 url + 폴더 위치
// api/music/index : music url + 미들웨어
// api/music/music.ctrl.js : 컨트롤러 역할

router.use("/music", music);
router.use("/movie", movie);
router.use("/contact", contact);
router.use("/user", user);

module.exports = router;
