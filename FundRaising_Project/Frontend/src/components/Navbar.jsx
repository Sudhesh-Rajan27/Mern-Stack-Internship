import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 mb-0 pb-0">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">Fund</h1>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
        <ul className={`md:flex md:space-x-6 ${isOpen ? "block" : "hidden"} mt-4 md:mt-0`}>
          <li><a href="#home" className="hover:text-green-500">Home</a></li>
          <li><a href="#donation" className="hover:text-green-500">Donation</a></li>
          <li><a href="#fundraisercount" className="hover:text-green-500">How It Works</a></li>
          <li><a href="#faq" className="hover:text-green-500">About Us</a></li>
          <li><Link to="/login" className="hover:text-green-500">Sign-up</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
