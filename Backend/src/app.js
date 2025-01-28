const express = require('express');

const app = express();

app.get('/',(req,res)=>{
    res.send('Hello from /');
})
app.get('/dash',(req,res)=>{
    res.send('Hello from /dash');
})
app.get('/api',(req,res)=>{
    res.send('Hello from /api');
})
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})