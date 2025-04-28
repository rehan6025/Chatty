const express = require("express");
const {chats} = require("./data/data");

const app = express();

app.get('/', (req,res)=>{
    res.send("App is listening");
})

app.get('/api/chats', (req,res)=>{
    res.send(chats)
})

app.get('/api/chats', (req,res)=>{
    res.send(chats)
})

app.listen(5000, ()=>{
    console.log("Server listening on port 5000...");
})