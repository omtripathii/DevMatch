const express = require('express');

const app = express();

// app.use("/context/:username/:password", (req, res) => {
//     console.log(req.query)
//     console.log(req.params)
//     res.send('This is my own middleware')
    
// })

app.use("/home",(req,res,next)=>{
    console.log('This is my own route handler 1');
    next();
},(req,res,next)=>{
    console.log('This is my own route handler 2');
    next();
},(req,res,next)=>{
    console.log('This is my own route handler 3');
    next();
},(req,res)=>{
    console.log('This is my own route handler 4');
    res.send('This is my own middleware and i am handling multiple routes with this')
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})