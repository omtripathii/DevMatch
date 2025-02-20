require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Unauthorized, Please login first");
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).send("Unauthorized, Please login first");
    }
    const { id } = decoded;
    const user = await User.findById(id);
    if (!user) {
      return res.status(401).send("Unauthorized, Please login first");
    } else {
      req.user = user;
    }
    next();
  } catch (error) {
    res.status(401).send("Unauthorized, Please login first");
  }
};


module.exports = { userAuth };
