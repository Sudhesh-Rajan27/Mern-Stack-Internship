import React, { useRef } from "react";

const Nav = ({ scrollToSection }) => {
  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-black text-white z-50">
      <div className="text-2xl font-bold">Portfolio</div>
      <ul className="flex space-x-4">
        <li>
          <button onClick={() => scrollToSection("home")} className="focus:outline-none">
            Home
          </button>
        </li>
        <li>
          <button onClick={() => scrollToSection("about")} className="focus:outline-none">
            About
          </button>
        </li>
        <li>
          <button onClick={() => scrollToSection("projects")} className="focus:outline-none">
            Projects
          </button>
        </li>
        <li>
          <button onClick={() => scrollToSection("gallery")} className="focus:outline-none">
            Gallery
          </button>
        </li>
        <li>
          <button onClick={() => scrollToSection("contact")} className="focus:outline-none">
            Contact
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
