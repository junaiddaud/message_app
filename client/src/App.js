import './App.css';
import io from "socket.io-client";
import {useState} from 'react';
import Chat from './Chat';
const socket=io.connect("http://localhost:3001");

function App() {
  const [username,setUsername]=useState("")
  const [roomname,setRoomname]=useState("")
  const [show,setShow]=useState(false)
  const joinRoom=()=>{
    if(username!=="" && roomname!==""){
      socket.emit("join_room",roomname)
      setShow(true)
    }
  }
  return (
    <div className="App">
      
       { 
       !show ? (
      <div className="joinChatContainer">
   <h4>Join a Room</h4>
      <input type="text"
      placeholder="jhon.."
      onChange={(event)=>{
setUsername(event.target.value)
      }} ></input>
      <input type="text"
      placeholder="jhon123.."
      onChange={(event)=>{
setRoomname(event.target.value)
      }} 
    
  />
        
  <button onClick={joinRoom}>Join Room</button>
  </div>
       )
  :(
   <Chat socket={socket} username={username} room={roomname} />
   )
  }
    
    </div>
  );
}

export default App;
