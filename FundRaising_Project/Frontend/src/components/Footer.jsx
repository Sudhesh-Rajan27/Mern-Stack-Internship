import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto text-center">
        <h2 className="text-xl font-bold">Fund</h2>
        <p className="text-gray-400 mt-2">Elevating Experience & Seize Control Of Your Smart Home!</p>
        <div className="mt-4 flex justify-center space-x-4">
          <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
          <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
          <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
          <a href="#" className="text-gray-400 hover:text-white">LinkedIn</a>
        </div>
        <div className="mt-6 text-gray-400">
          <a href="#" className="mx-2 hover:text-white">Privacy Policy</a>
          <a href="#" className="mx-2 hover:text-white">Terms of Service</a>
          <a href="#" className="mx-2 hover:text-white">Contact Us</a>
        </div>
        <p className="mt-6 text-gray-400">© 2023 Fund. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;