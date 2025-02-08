const e = require("express");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please provide your first name"],
    },
    lastName: {
        type: String,
        required: [true, "Please provide your last name"],
    },
    age: {
        type: Number,
        required: [true, "Please provide your age"],
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
    },
    gender: {
        type: String,
        required: [true, "Please provide your sex"],
    }

});

module.exports = mongoose.model("User", userSchema);