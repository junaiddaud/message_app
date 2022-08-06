const express=require('express')
const app=express()
const http=require('http')
const cors=require('cors')
const {Server} =require('socket.io')
app.use(cors);


const PORT=process.env.PORT|| 3001
if(process.env.NODE_ENV==="production"){
    app.use.static('client/build')
}

const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin: "http://localhost:3000",
        methods:["GET","POST"]
    }
})
io.on("connection",(socket)=>{
   
    socket.on("join_room",(data)=>{
        socket.join(data)

    })
    socket.on("send_message",(data)=>{
       socket.to(data.room).emit("receive_msg",data)
      
    })
     
    socket.on("disconnect",()=>{
console.log("disconnected")
    })
})
app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});



server.listen(PORT,()=>{
    console.log("Server is Running")
})