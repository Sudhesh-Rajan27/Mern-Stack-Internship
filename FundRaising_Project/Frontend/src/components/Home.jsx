import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <section id="home" className="pt-0 mt-0 h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="relative w-full h-[80vh] flex flex-col justify-center items-center text-center">
        <img 
          src="hero-image.jpeg" 
          alt="Helping Hands" 
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />
        <h1 className="relative text-6xl font-bold text-white">
          Fund <span className="text-green-400">Help Others</span>
        </h1>
        <button 
          className="relative mt-6 px-6 py-3 bg-green-500 text-white rounded-full text-lg font-semibold"
          onClick={() => navigate("/login")} // Navigate to login page
        >
          Start Fundraising
        </button>
      </div>
    </section>
  );
};

export default Home;
