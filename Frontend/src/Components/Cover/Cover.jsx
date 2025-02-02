import React from "react";
import { useNavigate } from "react-router-dom";

const Cover = ({ name }) => {
  const navigate = useNavigate();

  return (
    <div className="hero bg-base-200 min-h-screen flex items-center">
      <div className="hero-content flex flex-col lg:flex-row w-full px-8 lg:px-20">
        {/* Left Side Content */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-5xl font-bold ">Welcome to CodeBox</h1>
          <p className="py-6 text-lg">
            Experience the power of an online code editor with real-time 
            collaboration and powerful AI autocompletion.
          </p>
          <button 
            className="btn btn-primary px-6 py-3 text-lg "
            onClick={() => navigate("/editor")}
          >
            Create or Join Room
          </button>
        </div>

        {/* Right Side Image */}
        <div className="flex-1 flex justify-center">
          <img 
            src="/cover.jpg" 
            className="max-w-sm lg:max-w-md rounded-lg shadow-2xl"
            alt="Cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Cover;
