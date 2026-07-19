import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'

import Header from "./components/Header"
import Navbar from "./components/Navbar"
import About from "./components/About"
import Skills from "./components/Skills"
import Projects from "./components/Projects"
import Contact from "./pages/ContactPage"
import Footer from "./components/Footer"
import NotFound from "./pages/NotFoundPage"
function App() {
  const skills = ["Java", "Flutter", "Database", "Python", "Machine Learning"];
  const projects = ["AI Assistant App", "JobFlow App"];

  const [showSkills, setShowSkills] = useState(true); // useState #1: toggle visibility
  const [message, setMessage] = useState("");          // useState #2: controlled form input

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={
          <>
            <Header name="Diya Shah" />
            <About />
            <button onClick={() => setShowSkills(!showSkills)}>
              {showSkills ? "Hide Skills" : "Show Skills"}
            </button>
            {showSkills && <Skills skillsList={skills} />}
          </>
        } />

        <Route path="/projects" element={<Projects projectlist={projects} />} />

        <Route path="/contact" element={
          <Contact />
        } />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App