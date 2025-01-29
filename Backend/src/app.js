const express = require('express');

const app = express();

const connectDB = require('./config/database');

connectDB()
.then(()=>{
    console.log("Database connected")
    app.listen(3000,()=>{
        console.log('Server is running on port 3000');
    })
}
).catch((err)=>{
    console.log(err);
})
