require("dotenv").config();
const express = require("express");

const app = express();

const User = require("./models/User");
const connectDB = require("./config/database");

app.use(express.json());

// Adding User to the database

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

// Getting all the users from the database
app.get("/feed", async(req,res)=>{
  try {
    const users = await User.find({})
    console.log(users);
    res.status(200).send(users)
  } catch (error) {
    res.status(400).send("Something went wrong"+ error)
  }
})

// Getting a specific user by the Email Id

app.get("/user" , async(req,res)=>{
  try {
    const emailId = req.query.email;
    const user = await User.find({email: emailId})
    console.log(user);
    res.status(200).send(user)
    if (!user) {
      res.status(404).send("User not found")
    }
  } catch (error) {
    res.status(400).send("Something went wrong"+ error)
  }
})

// Deleting a user from the database

app.delete("/delete", async(req,res)=>{
  try {
    const userId = req.body.id
    await User.findByIdAndDelete(userId)
    res.status(200).send("User deleted successfully")
  } catch (error) {
    res.status(400).send("Something went wrong" + error)
  }
})


// Updating a user data in the database

app.patch("/update/:userID", async(req,res)=>{
  try {
    const userId = req.params?.userID
    const data = req.body
    const ALLOWED_UPDATES = ["age", "password", "about", "skills", "photoUrl"]
    const isValidUpdate = Object.keys(data).every((update)=> ALLOWED_UPDATES.includes(update))
    if(!isValidUpdate){
      throw new Error("Update not allowed")
    }
    if(data?.skills.length > 10){
      throw new Error("Skills limit exceeded")
    }
    await User.findByIdAndUpdate(userId, data , {returnDocument: 'after' , runValidators: true})
    res.status(200).send("User updated successfully")
  } catch (error) {
    res.status(400).send("Something went wrong" + error)
  }
})


// updating the user data in the database using email id

app.patch("/updateByEmail", async(req,res)=>{
  try {

    
    const emailId = req.body.email
    const data = req.body

    
    await User.findOneAndUpdate({email: emailId}, data , {returnDocument: 'after'})
    res.status(200).send("User updated successfully")
  } catch (error) {
    res.status(400).send("Something went wrong")
  }
})




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

  