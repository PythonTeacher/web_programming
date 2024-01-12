const { Router } = require("express");
const router = Router();

// controllers/index : 대분류 url + 폴더 위치
// controller/admin/index : admin url + 미들웨어
// controller/admin/admin.ctrl.js : 컨트롤러 역할

router.use("/admin", require("./admin"));
//router.use("/contact", require("./contact"));

module.exports = router;
