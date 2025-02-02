import express from "express";
import http from "http";
import { exec } from "child_process";
import cors from "cors";
import bodyParser from "body-parser";
import { Server } from "socket.io";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Use middlewares
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Allow all origins for now
    },
});

const rooms = new Map();

io.on("connection", (socket) => {
    console.log("User Connected", socket.id);

    let currentRoom = null;
    let currentUser = null;

    socket.on("join", ({ roomId, userName }) => {
        if (currentRoom) {
            socket.leave(currentRoom);
            rooms.get(currentRoom).delete(currentUser);
            io.to(currentRoom).emit("userJoined", Array.from(rooms.get(currentRoom)));
        }
        currentRoom = roomId;
        currentUser = userName;

        socket.join(roomId);

        if (!rooms.has(roomId)) {
            rooms.set(roomId, new Set());
        }
        rooms.get(roomId).add(userName);
        io.to(currentRoom).emit("userJoined", Array.from(rooms.get(currentRoom)));
    });

    socket.on("codeChange", ({ roomId, code }) => {
        socket.to(roomId).emit("codeUpdate", code);
    });

    socket.on("leaveRoom", () => {
        if (currentRoom && currentUser) {
            rooms.get(currentRoom).delete(currentUser);
            io.to(currentRoom).emit("userJoined", Array.from(rooms.get(currentRoom)));
            socket.leave(currentRoom);
            currentRoom = null;
            currentUser = null;
        }
    });

    socket.on("typing", ({ roomId, userName }) => {
        socket.to(roomId).emit("userTyping", userName);
    });

    socket.on("languageChange", ({ roomId, language }) => {
        io.to(roomId).emit("languageUpdate", language);
    });

    socket.on("disconnect", () => {
        if (currentRoom && currentUser) {
            rooms.get(currentRoom).delete(currentUser);
            io.to(currentRoom).emit("userJoined", Array.from(rooms.get(currentRoom)));
        }
        console.log("User disconnected");
    });
});

app.post("/execute", (req, res) => {
    const { language, code } = req.body;
    const tempFilePath = path.join(__dirname, 'temp_code.py');
    let command;
    try{
        const cleanCode = code.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

        switch (language) {
            case "python":
                // Save the code to a temporary file
                fs.writeFileSync(tempFilePath, cleanCode);
                // Execute the file
                command = `python ${tempFilePath}`;
                break;
            case "java":
                const javaFilePath = path.join(__dirname, 'Main.java');
                fs.writeFileSync(javaFilePath, cleanCode);
                command = `javac ${javaFilePath} && java Main`;
                break;
            case "javascript":
                const jsFilePath = path.join(__dirname, 'script.js');
                fs.writeFileSync(jsFilePath, cleanCode);
                command = `node ${jsFilePath}`;
                break;
            case "cpp":
                const cppFilePath = path.join(__dirname, 'main.cpp');
                fs.writeFileSync(cppFilePath, cleanCode);
                command = `g++ ${cppFilePath} -o main && ./main`;
                break;
            default:
                return res.status(400).send("Invalid language");
    }

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error("Error executing command:", error);  // Log the error to console
            return res.status(500).json({ error: stderr || error.message });
        }

        if (stderr) {
            console.warn("Command executed with warnings:", stderr);  // Log warnings to console
        }
        res.json({ output: stdout });
    });
    }catch (err) {
    console.error("Error in code execution:", err);  // Catch any syntax errors in the try block
    return res.status(400).json({ error: "Invalid code syntax or other error." });
    }
});

const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`Server is working on port ${port}`);
});

