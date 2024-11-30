const mongoose = require("mongoose");
const { Schema } = mongoose;

const courceSchema = new Schema({
  id: { type: String },
  title: {
    type: String,
    require: true,
  },
  decription: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId, //primary key
    ref: "User", //try "user"
  },
  students: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("course", courceSchema);
