const router = require("express").Router();

router.use((req, res, next) => {
  console.log("正在進行authenticate...");
  next();
});
router.get("/testAPI", (req, res) => {
  return res.send("success~");
});

module.exports = router;
