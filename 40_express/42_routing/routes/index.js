const express = require("express");
const router = express.Router();
//const { Router } = require("express");
//const router = Router();

const music = require("../api/music");
const user = require("../api/user");
const contact = require("../api/contact");

// controllers/index : 대분류 url + 폴더 위치
// controller/admin/index : admin url + 미들웨어
// controller/admin/admin.ctrl.js : 컨트롤러 역할

router.use("/music", music);
router.use("/user", user);
router.use("/contact", contact);

module.exports = router;
