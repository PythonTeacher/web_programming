const { Router } = require("express");
const router = Router();

const music = require("./music");
const movie = require("./movie");
const user = require("./user");

router.use("/music", music);
router.use("/movie", movie);
router.use("/user", user);

module.exports = router;
