const router = require("express").Router();
const {
  courseValidation,
  registerValidation,
  loginValidation,
} = require("../validation");
const Course = require("../models").course;

router.use((req, res, next) => {
  console.log("course router 正在接受request...");
  next();
});
//add user into course
//kick somebody out

module.exports = router;
