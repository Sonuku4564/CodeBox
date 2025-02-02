import React from "react";
import Cover from "../Components/Cover/Cover";
import HomeNav from "../Components/HomeNav/HomeNav";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col ">
      {/* Navbar at the top */}
      <HomeNav />

      {/* Cover section takes most of the screen */}
      <div className="flex-1 flex justify-center items-center">
        <Cover />
      </div>
    </div>
  );
};

export default HomePage;
