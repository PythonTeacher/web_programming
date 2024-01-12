var express = require("express");
var router = express.Router();

function testmiddleware(req, res, next) {
  console.log("첫번째 미들웨어");
  next();
}

function testmiddleware2(req, res, next) {
  console.log("두번째 미들웨어");
  next();
}

/*function loginRequired(req, res, next) {
  if (로그인이 되어있지 있으면) {
    res.redirect('로그인창')
  } else {
    next();
  }
}*/

router.get("/", testmiddleware, testmiddleware2, function (req, res) {
  res.send("admin");
});

router.get("/products", function (req, res) {
  //res.send("user list");
  res.render("admin/products.html", {
    //message: "Hello!!",
    message: "<h1>태그가 출력됩니다</h1>", // false이면 html태그가 먹힘
    online: "express",
  });
});

router.get("/products/write", (req, res) => {
  res.render("admin/write.html");
});

router.post("/products/write", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

module.exports = router;
