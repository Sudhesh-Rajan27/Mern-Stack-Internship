import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center p-8 space-y-8">
      {/* Collaboration Title */}
      <h2 className="text-lg text-green-500 uppercase tracking-widest">
        Collaboration
      </h2>
      <h1 className="text-6xl font-bold text-center">
        Let's talk about <span className="text-green-500">Collaboration</span>
      </h1>

      {/* Buttons */}
      <div className="flex space-x-4">
        <button className="px-6 py-3 bg-green-500 text-black font-semibold rounded-md hover:bg-green-600 transition">
          Get in Touch
        </button>
        <button className="px-6 py-3 border-2 border-green-500 text-green-500 font-semibold rounded-md hover:bg-green-500 hover:text-black transition">
          Hire Me Now
        </button>
      </div>

      {/* Footer Section */}
      <div className="w-full border-t border-gray-700 pt-8 text-center space-y-4">
        <p className="text-gray-400">
          Working in development and design has given me a stronger sense of the
          extraordinary in my digital work.
        </p>
        <p className="text-gray-500">© Sudhesh Rajan. All rights reserved 2025</p>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-6 mt-4">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-green-500 transition"
          >
            Instagram
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-green-500 transition"
          >
            Facebook
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-green-500 transition"
          >
            Twitter
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-green-500 transition"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
