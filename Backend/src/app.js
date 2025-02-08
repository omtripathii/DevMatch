require("dotenv").config();
const express = require("express");

const app = express();

const User = require("./models/User");
const connectDB = require("./config/database");

app.use(express.json());
app.post("/signup", async (req, res) => {

  // Dynamically getting the data from the API
  const newUser = new User(req.body);
  try {
    await newUser.save();
    res.status(200).send("User Added Successfully")
  } catch (error) {
    console.error("Failed to add user", error);
  }

   // Creating instance of User  and Hardcoding the values
  /** 
   const newUser = new User({
    firstName: "Aditi",
    lastName: "Saini",
    email: "aditi1234@gmail.com",
    age: 21,
    gender: "Female"
  })
  */

});

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

  