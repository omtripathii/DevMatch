require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");

app.use(express.json());
app.use(cookieParser());



const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestAuth = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestAuth);

connectDB()
  .then(() => {
    console.log("Database connected");

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
