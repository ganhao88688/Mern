const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const { auth: authRoute, course: courseRoute } = require("./routes");
const passport = require("passport");
require("./config/passport")(passport);
const cors = require("cors");

//連結mongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/mernDB")
  .then(() => console.log("connected to mongoDB..."))
  .catch((e) => console.log(e));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/user", authRoute);
//courseRoute 應該被jwt保護
app.use(
  "/api/courses",
  passport.authenticate("jwt", { session: false }),
  courseRoute
);
let now = new Date();
let date = `0${now.getDate()}`.slice(-2);
let minutes = `0${now.getMinutes()}`.slice(-2);
app.listen(8080, () =>
  console.log(
    `listening at port 8080 at ${
      now.getMonth() + 1
    }/${date} ${now.getHours()}:${minutes}`
  )
);
