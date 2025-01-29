import React from "react";

const projects = [
  {
    title: "Project 1",
    description: "House price detection",
    githubLink: "https://github.com/Sudhesh-Rajan27/House-value-prediction",
  },
  {
    title: "Project 2",
    description: "Face expression Detection",
    githubLink: "https://github.com/Sudhesh-Rajan27/Image-classifier",
  },
  {
    title: "Project 3",
    description: "Deaf & Dumb learning app",
    githubLink: "https://github.com/Sudhesh-Rajan27/Drishaya-Yatra",
  },
  {
    title: "Project 4",
    description: "Shoplifting detection",
    githubLink: "https://github.com/Sudhesh-Rajan27/stealthwatch",
  },
];

const Projects = () => {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h2 className="text-4xl font-bold text-center mb-8">My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg shadow-lg p-6 hover:bg-gray-700 transition"
          >
            <h3 className="text-2xl font-semibold mb-4">{project.title}</h3>
            <p className="mb-6">{project.description}</p>
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-green-500 text-black rounded-md hover:bg-green-600 transition"
            >
              View on GitHub
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
