import React from "react";

const About = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen bg-black text-white px-8 lg:px-24 py-12">
      {/* Left Section */}
      <div className="lg:w-1/2 space-y-6">
        <h3 className="text-green-500 text-lg font-semibold">About Me</h3>
        <h1 className="text-5xl lg:text-6xl font-bold">
          I can deliver results that exceed your expectations.
        </h1>
        <button className="flex items-center px-6 py-3 mt-4 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-600 transition">
          Hire Me Now <span className="ml-2">→</span>
        </button>
      </div>

      {/* Right Section */}
      <div className="lg:w-1/2 mt-8 lg:mt-0 space-y-8">
        <p className="text-lg leading-relaxed">
        Hi, I’m Sudhesh Rajan, an engineering student passionate about technology and innovation. I specialize in developing creative solutions that blend design and functionality, with expertise spanning web development, app development, and AI-powered technologies. My journey is driven by a love for building impactful projects that enhance user experiences and solve real-world problems.
        </p>
        <div className="flex flex-wrap gap-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-green-500">4</h2>
            <p className="text-gray-400 mt-2">Project Complete</p>
          </div>
          <div className="text-center">
            <h2 className="text-4xl font-bold text-green-500">8</h2>
            <p className="text-gray-400 mt-2">Certification</p>
          </div>
          <div className="text-center">
            <h2 className="text-4xl font-bold text-green-500">1</h2>
            <p className="text-gray-400 mt-2">Internship</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
