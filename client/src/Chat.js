import { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom"

const Chat = ({socket,username,room}) => {

    const [msg,setMsg]=useState("")
    const [msgList,setMsgList]=useState([])

    const sendMessage= async()=>{
        if(msg!==""){
const msgData={
    room:room,
    author:username, 
    message:msg,
    time: new Date(Date.now()).getHours()+":" +new Date(Date.now()).getMinutes()

}
await socket.emit("send_message",msgData)
    setMsgList((List)=>[...List,msgData])
    setMsg("")

        }
    }

useEffect(()=>{
       socket.on("receive_msg",(rcvData)=>{
    
        setMsgList((List)=>[...List,rcvData])
       })
     

    },[socket] )
    return ( 

        <div className="chat-window">
         
            <div className="chat-header">
                <p>Live Chat</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
             
{
   
    msgList.map((msg)=>{

       return(
        <div className="message" id={username===msg.author?"you":"other"}>
            <div>
            <div className="message-content">

                <p>{msg.message}</p>
            </div>
            <div className="message-meta">
                <p id="time">{msg.time}</p>
                <p id="author">{msg.author}</p>
            </div>
            </div>
        </div>
        
        
        )
    })
}
</ScrollToBottom>

            </div>
            <div className="chat-footer">
                <input type="text"
                placeholder="Enter Message" 
                value={msg}
                onChange={(event)=>{
                    setMsg(event.target.value)
                }} 
                onKeyDown={(event)=>{
                    event.key==="Enter" && sendMessage()
                   }}
                
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
     );
}
 
export default Chat;