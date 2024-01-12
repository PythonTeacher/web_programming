var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
  res.send("contact");
});

router.get("/list", function (req, res) {
  res.send("contact list");
});

module.exports = router;
