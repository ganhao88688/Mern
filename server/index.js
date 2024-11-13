const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes").auth;

//連結mongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/mernDB")
  .then(() => console.log("connected to mmongoDB..."))
  .catch((e) => console.log(e));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", authRoute);
app.listen(8080, () => console.log("listening at port 8080"));
