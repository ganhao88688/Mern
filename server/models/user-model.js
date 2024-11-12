const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;
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

//mongoose middleware
userSchema.pre("save", async function (next)=>{
    // this代表mongooseDB的document
    if(this.isNew || this.isModified("password"))
})