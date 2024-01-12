var express = require("express");
var router = express.Router();

router.use("/", function (req, res, next) {
  console.log("logging");
  next(); // pass control to the next handler
});

router.get("/", function (req, res) {
  res.send("music get");
});

router.post("/", function (req, res) {
  res.send("music post");
});

router.put("/", function (req, res) {
  res.send("music put");
});

router.delete("/", function (req, res) {
  res.send("music delete");
});

router.get("/:title/:singer", function (req, res) {
  console.log("req.params:", req.params);
  var title = req.params.title;
  var singer = req.params.singer;

  res.send("url parameter(get) -> title:" + title + ", singer:" + singer);
});

router.post("/:title/:singer", function (req, res) {
  console.log("req.params:", req.params);
  var title = req.params.title;
  var singer = req.params.singer;

  res.send("url parameter(post) -> title:" + title + ", singer:" + singer);
});

module.exports = router;
