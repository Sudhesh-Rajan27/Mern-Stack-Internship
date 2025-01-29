import React from "react";
import bgimg from '../back-modified.jpg';

const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white p-8">
      {/* Left Side: Text Content */}
      <div className="flex-1 space-y-4 pl-14"> {/* Added padding to the left */}
        <h1 className="text-5xl font-bold">
          Hello, I'm <span className="text-green-500">Sudhesh Rajan</span>
        </h1>
        <p className="text-xl">
          A passionate developer who loves building awesome projects. Nice to
          meet you!
        </p>
        <button className="mt-4 px-6 py-2 bg-green-500 text-black rounded-md hover:bg-green-600 transition">
          Contact Me
        </button>
      </div>

      {/* Right Side: Profile Picture */}
      <div className="flex-1 flex justify-center">
        <img
          src={bgimg} // Replace with the actual path to your profile pic in public folder
          alt="Profile"
          className="w-64 h-64 object-cover rounded-full shadow-lg"
        />
      </div>
    </div>
  );
};

export default Home;
