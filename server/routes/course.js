const router = require("express").Router();
const {
  courseValidation,
  registerValidation,
  loginValidation,
} = require("../validation");
const courceSchema = require("../models").course;

router.use((req, res, next) => {
  console.log("course router 正在接受request...");
  next();
});
router.post("/createCource", async (req, res) => {
  //check data format
  let data = courseValidation(req.body);
  if (data.error) return res.status(400).send(data.error.details[0].message);
  //is instructor
  if (req.user.isStudent()) {
    return res.status(400).send("只有講師才可以發布課程!");
  }
  //same instructor in the courses

  //save
  let { title, description, price } = req.body;
  try {
    let newCourse = new courceSchema({
      title,
      description,
      price,
      instructor: req.user._id,
    });
    let savedCourse = await newCourse.saved(); //同個使用者有多個課程不會出錯嗎?不是primary key?
    return res.send({
      message: "新課程已保存",
      savedCourse,
    });
  } catch (e) {
    return res.status(500).send("創建課程失敗...");
  }
});
//add user into course
//kick somebody out

module.exports = router;
