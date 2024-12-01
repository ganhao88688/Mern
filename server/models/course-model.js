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
    ref: "user", //mongoDB有users(collection)
  },
  students: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("course", courceSchema);
