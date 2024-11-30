const router = require("express").Router();
const {
  courseValidation,
  registerValidation,
  loginValidation,
} = require("../validation");
const userSchema = require("../models").user;
const jwt = require("jsonwebtoken");

router.use((req, res, next) => {
  console.log("正在進行authenticate...");
  next();
});
router.get("/testAPI", (req, res) => {
  return res.send("test success~");
});
router.post("/register", async (req, res) => {
  //correct data format
  let data = registerValidation(req.body);
  if (data.error) return res.status(400).send(data.error.details[0].message);
  //the email has not regitered
  let usedEmail = await userSchema.findOne({ email: data.value.email });
  if (usedEmail) return res.status(400).send("This email has used.");
  //store user data
  let newUser = new user(req.body);
  try {
    let saved = await newUser.save();
    return res.send("regiter success!");
  } catch (error) {
    console.log(error);
    return res.status(500).send("save error");
  }
});
router.post("/login", async (req, res) => {
  //check login data format
  let data = loginValidation(req.body);
  if (data.error) return res.status(400).send(data.error.details[0].message);
  //check email registered
  let foundUser = await userSchema.findOne({ email: req.body.email });
  console.log(foundUser);
  if (!foundUser) return res.status(401).send("This email isn't registed.");
  //compare password
  foundUser.comparePassword(req.body.passWord, (error, isMatch) => {
    if (error) return res.status(500).send(error);
    if (isMatch) {
      //json web token
      const tokenObject = { _id: foundUser._id, email: foundUser.email };
      const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
      return res.send({
        message: "成功登入",
        token: "JWT " + token, //JWt後沒空格會出bug
        user: foundUser,
      });
    } else {
      res.status(401).send("Wrong PassWord!");
    }
  });
});

//end course
//buy course

module.exports = router;
