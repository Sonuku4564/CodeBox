import express from "express"
import http from "http"
import { Server } from "socket.io"

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

const rooms = new Map();

io.on("connection" ,(socket)=>{
    console.log("User Connected", socket.id);

    let currentRoom = null;
    let currentUser = null;

    socket.on("join", ({roomId, userName})=>{
        if(currentRoom){
            socket.leave(currentRoom);
            rooms.get(currentRoom).delete(currentUser);
            io.to(currentRoom).emit("user Joined", Array.from(rooms.get(currentRoom)));
        }
        currentRoom = roomId;
        currentUser = userName;

        socket.join(roomId);

        if(!rooms.has(roomId)){
            rooms.set(roomId, new Set());
        }
        rooms.get(roomId).add(userName);
        io.to(currentRoom).emit("userJoined", Array.from(rooms.get(currentRoom)));

    });
    
    /*second socket here */
    socket.on("codeChange", ({roomId, code})=>{
        socket.to(roomId).emit("codeUpdate", code);
    });

    socket.on("leaveRoom", ()=>{
        if(currentRoom && currentUser){
            rooms.get(currentRoom).delete(currentUser);
            io.to(currentRoom).emit("userJoined", Array.from(rooms.get(currentRoom)));


            socket.leave(currentRoom);

            currentRoom= null;
            currentUser = null;
        }
    });

    socket.on("typing", ({roomId, userName})=>{
        socket.to(roomId).emit("userTyping", userName);
    });

    socket.on("languageChange", ({ roomId, language }) => {
        io.to(roomId).emit("languageUpdate", language);
    });
    

    socket.on("disconnect",()=>{
        if(currentRoom && currentUser){
            rooms.get(currentRoom).delete(currentUser);
            io.to(currentRoom).emit("userJoined", Array.from(rooms.get(currentRoom)));
        }
        console.log("user disconnected");  
    });
});

const port = process.env.PORT || 5000;

server.listen(port, ()=>{
    console.log("Server is Working on port 5000")
});