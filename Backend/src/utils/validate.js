const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, email, password } = req.body;
  if (!firstName || !email || !password) {
    throw new Error("Please provide all the required fields");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is invalid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password should contain atleast one uppercase, one lowercase and one digit"
    );
  }
};
module.exports = {
  validateSignUpData,
};
