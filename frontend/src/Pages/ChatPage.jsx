import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ChatPage = () => {

    const [chats, setChats] = useState([]);

    

    useEffect(()=>{
        const fetchChats = async () => {
            const {data} = await axios.get('/api/chats')
            setChats(data); 
            console.log(data);
        }

        fetchChats();
    }, []) 


  return (
    <div>
      {chats.map( ( chat )=>{
        console.log(chat.users);
        
      })}
    </div>
  )
}

export default ChatPage
