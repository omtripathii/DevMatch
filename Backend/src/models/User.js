const e = require("express");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide your first name"],
    },
    lastName: {
      type: String,
      default: "NA",
    },
    age: {
      type: Number,
      required: [true, "Please provide your age"],
      min: 18,
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please provide your password"],
      minLength: 6,
      maxLength: 18,
      validate(value) {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,18}$/.test(
          value
        );
      },
      message:
        "Password should contain atleast one uppercase, one lowercase and one digit",
    },
    gender: {
      type: String,
      required: [true, "Please provide your sex"],
      lowercase: true,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is invalid");
        }
      },
    },
    about: {
      type: String,
      default: "Write something about yourself",
    },
    photoUrl: {
      type: String,
      default:
        "https://w7.pngwing.com/pngs/177/551/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere-thumbnail.png",
    },
    skills: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
