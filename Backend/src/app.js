const express = require('express');

const app = express();

// app.use("/context/:username/:password", (req, res) => {
//     console.log(req.query)
//     console.log(req.params)
//     res.send('This is my own middleware')
    
// })

// app.use("/home",(req,res,next)=>{
//     console.log('This is my own route handler 1');
//     next();
// },(req,res,next)=>{
//     console.log('This is my own route handler 2');
//     next();
// },(req,res,next)=>{
//     console.log('This is my own route handler 3');
//     next();
// },(req,res)=>{
//     console.log('This is my own route handler 4');
//     res.send('This is my own middleware and i am handling multiple routes with this')
// })



const {adminAuth , userAuth} = require("./middlewares/auth");

app.use("/admin",adminAuth)

app.get("/admin/getAllData",(req,res)=>{
    console.log('This is admin route and we are getting all data');
    res.send('Data is fetched successfully')
})
app.post("/admin/deleteUser",(req,res)=>{
    res.send('user is deleted successfully')
})

app.get("/user/login",(req,res)=>{
    res.send('User is logged in successfully')
})

app.get("/user",userAuth,(req,res)=>{
    res.send(' user Data is fetched successfully')
})



app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})