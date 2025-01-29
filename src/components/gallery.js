import React from "react";
import RollingGallery from "./rollinggallery";

// Example images array
const images = [
  "1.png", // Replace these with your actual image URLs
  "2.png",
  "3.png",
  "4.png",
  "5.png",
  "6.png",
];

const Gallery = () => {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h2 className="text-4xl font-bold text-center mb-8">
        Selected Pics <span className="text-green-500">2023-2024</span>
      </h2>

      {/* Rolling Gallery Section */}
      <RollingGallery autoplay={true} pauseOnHover={true} images={images} />

      {/* Optional Horizontal Scroll Section */}
      <div className="relative overflow-x-auto mt-12">
        <div className="flex space-x-6">
          {images.map((image, index) => (
            <a
              key={index}
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-shrink-0 w-80 overflow-hidden rounded-lg shadow-lg transform hover:scale-105 transition"
            >
              <img
                src={image}
                alt={`Project ${index + 1}`}
                className="w-full h-60 object-cover group-hover:opacity-80 transition"
              />
            </a>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center">
        <button className="px-6 py-2 bg-green-500 text-black rounded-md hover:bg-green-600 transition">
          View More
        </button>
      </div>
    </div>
  );
};

export default Gallery;
