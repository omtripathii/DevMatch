const adminAuth = (req, res, next) => {
  console.log("admin is getting authenticated");

  const token = "xyz";
  const isValid = token === "xyz";
  if (!isValid) {
    res.status(401).send("Unauthorized , You are not an admin");
  } else {
    next();
  }
};
const userAuth = (req, res, next) => {
  console.log("user is getting authenticated");

  const token = "xyz";
  const isValid = token === "xyz";
  if (!isValid) {
    res.status(401).send("Unauthorized , You are not an user");
  } else {
    next();
  }
};

module.exports = { adminAuth, userAuth };
