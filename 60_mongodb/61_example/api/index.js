const express = require("express");
const router = express.Router();

router.use("/music", require("./music"));
router.use("/movie", require("./movie"));
router.use("/user", require("./user"));
router.use("/login", require("./login"));

module.exports = router;
