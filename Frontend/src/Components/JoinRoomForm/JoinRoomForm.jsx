import { useState } from "react";

const JoinRoomForm = ({ onJoin }) => {
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");

  const handleSubmit = () => {
    if (roomId && userName) {
      onJoin(roomId, userName);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <div className="bg-gray-800 p-8 rounded-xl shadow-xl w-80">
        <h1 className="text-2xl font-bold mb-4 text-center">Join Code Room</h1>
        <input
          className="w-full p-2 mb-3 rounded bg-gray-700 text-white focus:outline-none"
          type="text"
          placeholder="Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <input
          className="w-full p-2 mb-3 rounded bg-gray-700 text-white focus:outline-none"
          type="text"
          placeholder="Your Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default JoinRoomForm;