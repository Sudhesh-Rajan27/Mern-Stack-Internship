import React, { useRef } from "react";
import Nav from "./components/nav";
import Home from "./components/home";
import About from "./components/about";
import Projects from "./components/projects";
import Gallery from "./components/gallery";
import Contact from "./components/contact";
const App = () => {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const galleryRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (section) => {
    switch (section) {
      case "home":
        homeRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case "about":
        aboutRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case "projects":
        projectsRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case "gallery":
        galleryRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case "contact":
        contactRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Nav scrollToSection={scrollToSection} />
      <div ref={homeRef}>
        <Home />
      </div>
      <div ref={aboutRef}>
        <About />
      </div>
      <div ref={projectsRef}>
        <Projects />
      </div>
      <div ref={galleryRef}>
        <Gallery />
      </div>
      <div ref={contactRef}>
        <Contact />
      </div>
      {/* Add other sections with corresponding refs */}
    </div>
  );
};

export default App;
