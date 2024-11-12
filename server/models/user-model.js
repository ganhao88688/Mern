const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const userSchema = new Schema({
  userName: {
    type: String,
    require: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    require: true,
    minlength: 6,
    maxlength: 50,
  },
  passWord: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    enum: ["Student", "Instructor"],
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
//instance methods
userSchema.method.isStudent = function () {
  return this.role == "Student";
};
userSchema.method.isInstructor = function () {
  return this.role == "Instructor";
};
userSchema.method.comparePassword = async function (passWord, cb) {
  let same = await bcrypt.compare(passWord, this.passWord);
  return cb(null, same);
};

//mongoose middleware
//若使用者是新用戶或正在更改密碼，則將密碼hash
userSchema.pre("save", async function (next) {
  // this代表mongoDB內的document
  if (this.isNew || this.isModified("password")) {
    let hashValue = await bcrypt.hash(this.passWord, 10);
    this.passWord = hashValue;
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
