const express = require("express");
const {chats} = require("./data/data");

const app = express();

app.get('/', (req,res)=>{
    res.send("App is listening");
})

app.get('/api/chats', (req,res)=>{
    res.send(chats)
})

app.get('/api/chats/:id', (req,res)=>{
    const chatId = req.params.id;
    const singleChat = chats.find( c => c._id === chatId)
    res.send(singleChat);   
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}...`);
})