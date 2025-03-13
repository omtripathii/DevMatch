const express = require("express");
const profileAuth = express.Router();
const { userAuth } = require("../middlewares/auth");
const bcrypt = require("bcrypt");


// Profile API
profileAuth.get("/profile/view", userAuth, async (req, res) => {
  try {
    res.status(200).send(req.user);
  } catch (error) {
    res.status(400).send("Something went wrong" + error.message);
  }
});

// Update Profile API
profileAuth.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const ALLOWED_UPDATES = [
      "age",
      "about",
      "skills",
      "photoUrl",
      "gender",
      "firstName",
      "lastName",
    ];
    const isValidUpdate = Object.keys(req.body).every((update) =>
      ALLOWED_UPDATES.includes(update)
    );
    if (!isValidUpdate) {
      return res.status(400).json({ error: "Update not allowed" });
    }
    if (req.body?.skills && req.body.skills.length > 10) {
      return res.status(400).json({ error: "Skills limit exceeded" });
    }
    
    // Sanitize the about field if it exists
    if (req.body.about) {
      req.body.about = req.body.about.toString().trim();
    }
    
    const user = req.user;
    Object.keys(req.body).forEach((update) => {
      user[update] = req.body[update];
    });
    
    await user.save();
    return res.status(200).json({message: "Profile updated successfully", data: user});
  } catch (error) {
    console.error("Profile update error:", error);
    return res.status(400).json({
      error: "Something went wrong", 
      message: error.message,
      field: error.path // This will help identify which field caused the issue
    });
  }
});

//Forgot Password API
profileAuth.patch("/profile/change-password", userAuth, async (req, res) => {
  const currentLoggedInUser = req.user;
  try {
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const isValidPass = await currentLoggedInUser.isValidPassword(oldPassword);
    if (!isValidPass) {
      return res.status(400).send("Invalid Password");
    }
    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    currentLoggedInUser.password = newPasswordHash;
    await currentLoggedInUser.save();
    return res.status(200).send("Password updated successfully");
  } catch (error) {
    res.status(400).send("Something went wrong" + error.message);
  }
});

module.exports = profileAuth;
