const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validate");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const cookieParser = require("cookie-parser");
authRouter.use(express.json());
authRouter.use(cookieParser());
// Adding User to the database
authRouter.post("/signup", async (req, res) => {
  try {
    // Validating the data
    validateSignUpData(req);
    // Dynamically getting the data from the API
    const { firstName, lastName, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    const savedUser = await newUser.save();
    const token = await savedUser.getJWT();
    res.cookie("token", token);
    res
      .status(200)
      .json({ message: "User Added Successfully", data: savedUser });
  } catch (error) {
    console.error("Failed to add user", error);
  }
});

// Login API
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      // return res.status(404).send("User not found");
      return res.status(401).send("Invalid Credentials");
    }
    const isValidPass = await user.isValidPassword(password);
    if (!isValidPass) {
      // return res.status(401).send("Invalid Password");
      return res.status(401).send("Invalid Credentials");
    } else {
      // Generating the token
      // const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      //   expiresIn: "7h",
      // });
      const token = await user.getJWT();
      res.cookie("token", token);
      return res.status(200).send(user);
    }
  } catch (error) {
    return res.status(400).send("Something went wrong");
  }
});

//Logout API
authRouter.post("/logout", async (req, res) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .status(200)
    .send("User Logged out successfully");
});
module.exports = authRouter;
