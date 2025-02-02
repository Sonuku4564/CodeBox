import { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import JoinRoomForm from "../Components/JoinRoomForm/JoinRoomForm";
import EditorWithSidebar from "../Components/EditorWithSidebar/EditorWithSidebar";

const socket = io("http://localhost:5000");

const EditorPage = () => {
  const [joined, setJoined] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("// start code here");
  const [copySuccess, setCopySuccess] = useState("");
  const [users, setUsers] = useState([]);
  const [typing, setTyping] = useState("");
  const [output,setOutput] = useState("")

  useEffect(() => {
    socket.on("userJoined", setUsers);
    socket.on("codeUpdate", setCode);
    socket.on("userTyping", (user) => {
      setTyping(`${user.slice(0, 8)}... is Typing`);
      setTimeout(() => setTyping(""), 2000);
    });
    socket.on("languageUpdate", setLanguage);

    return () => {
      socket.off("userJoined");
      socket.off("codeUpdate");
      socket.off("userTyping");
      socket.off("languageUpdate");
    };
  }, []);

  const joinRoom = (roomId, userName) => {
    socket.emit("join", { roomId, userName });
    setRoomId(roomId);
    setUserName(userName);
    setJoined(true);
  };

  const leaveRoom = () => {
    socket.emit("leaveRoom");
    setJoined(false);
    setRoomId("");
    setUserName("");
    setCode("// start code here");
    setLanguage("javascript");
  };

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    setCopySuccess("Copied!");
    setTimeout(() => setCopySuccess(""), 2000);
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    socket.emit("codeChange", { roomId, code: newCode });
    socket.emit("typing", { roomId, userName });
  };

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    socket.emit("languageChange", { roomId, language: newLanguage });
  };


  const handleRunCode = async () => {
    try{
      const response = await axios.post("http://localhost:5000/execute",{language,code});

    if(response.data.output){
      setOutput(response.data.output);
      }
    else{
        setOutput(`Error: ${response.data.error}`);
    }
    }
    catch(error){
      if (error.response) {
        setOutput(`Failed to run code: ${error.response.data.error}`);
    } else {
        setOutput(`Failed to run code: ${error.message}`);
    }
    }  
    };

  return joined ? (
    <EditorWithSidebar
      roomId={roomId}
      userName={userName}
      language={language}
      code={code}
      users={users}
      typing={typing}
      onCodeChange={handleCodeChange}
      onLanguageChange={handleLanguageChange}
      onLeave={leaveRoom}
      copyRoomId={copyRoomId}
      copySuccess={copySuccess}
      onRunCode={handleRunCode}
      output={output}
    />
  ) : (
    <JoinRoomForm onJoin={joinRoom} />
  );
};

export default EditorPage;
