var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
  res.send("user");
});

router.get("/list", function (req, res) {
  res.send("user list");
});

module.exports = router;
