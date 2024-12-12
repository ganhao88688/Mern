const router = require("express").Router();
const { object } = require("joi");
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
//show all courses
router.get("/", async (req, res) => {
  //query object
  let found = await courceSchema
    .find({})
    .populate("instructor", ["userName", "email"]) //, "passWord" //與models定義的欄位名稱相同
    .exec();
  return res.send(found);
});
//find course with course id
router.get("/fcwid/:_id", async (req, res) => {
  try {
    console.log("in fcwId");
    let { _id } = req.params;
    let found = await courceSchema
      .find({ _id })
      .populate("instructor", ["email"])
      .exec();
    return res.send(found);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
});
//find course with course name
router.get("/fcwn/:title", async (req, res) => {
  try {
    console.log("in fcwName");
    let title = req.params.title; //req.params可以用this.param代替?
    console.log(`title:${title}`);
    let founded = await courceSchema
      .find({ title })
      .populate("instructor", ["userName", "email"]);
    if (!founded) return res.status(404).send("not found");
    return res.send(founded);
  } catch (e) {
    return res.status(500).send("some error");
  }
});
//find course with instructor id
router.get("/fcwii/:_id", async (req, res) => {
  try {
    console.log("in find courses with instructor id...");
    let { _id } = req.params;
    let found = await courceSchema
      .find({ instructor: _id })
      .populate("instructor", ["username", "email"])
      .exec();
    if (!found) return res.status(404).send("找不到符合id的課程");
    return res.send({
      // message: `找到${Object.keys(found).length}筆資料`,
      found,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send("some bugs...");
  }
});
//find course with studnet id
router.get("/student/:_id", async (req, res) => {
  try {
    console.log("in find course with student id");
    let { _id } = req.params;
    let found = await courceSchema
      .find({ students: _id })
      .populate("instructor", ["username", "email"])
      .exec();
    if (!found) return res.status(404).send("找不到符合id的課程");
    return res.send({
      message: `找到${Object.keys(found).length}筆資料`,
      found,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send("some bugs...");
  }
});
router.post("/createCourse", async (req, res) => {
  try {
    //check data format
    console.log("in createCourse");
    let data = courseValidation(req.body);
    if (data.error) return res.status(400).send(data.error.details[0].message);
    //is instructor
    if (req.user.isStudent()) {
      return res.status(400).send("只有講師才可以發布課程!");
    }
    //save
    let { title, description, price } = req.body;
    let newCourse = new courceSchema({
      title,
      description,
      price,
      instructor: req.user._id,
    });
    //同個使用者有多個課程不會出錯嗎?不是primary key?
    //會自動產生唯一的_id
    let savedCourse = await newCourse.save();
    return res.send({
      message: "新課程已保存",
      savedCourse,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send("創建課程失敗...");
  }
});
//modify course information
router.patch("/patch/:_id", async (req, res) => {
  try {
    console.log("in modify course");
    let validateResult = courseValidation(req.body);
    if (validateResult.error)
      return res.status(400).send(validateResult.error.details[0].message);
    //unique id in mongosh
    let { _id } = req.params;
    let found = await courceSchema.findOne({ _id });
    if (!found) return res.status(400).send("請先新增課程。");

    if (found.instructor.equals(req.user._id)) {
      let updatedCourse = await courceSchema.findOneAndUpdate(
        { _id },
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      return res.send({ message: "修改成功", updatedCourse });
    } else {
      return res.status(403).send("你不是該課程的講師!");
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
});
// has data in mongosh
router.delete("/deleteCourse/:_id", async (req, res) => {
  try {
    console.log("in delete course");
    let { _id } = req.params;
    let found = await courceSchema.findOne({ _id });
    if (!found) return res.status(400).send("找不到該課程。");

    if (found.instructor.equals(req.user._id)) {
      await courceSchema.deleteOne({ _id });
      return res.send("刪除成功");
    } else {
      return res.status(403).send("你不是該課程的講師!");
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
});
//add user into course
//kick somebody out

module.exports = router;
