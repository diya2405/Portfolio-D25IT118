import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Header from "./components/Header"
import Navbar from "./components/Navbar"
import About from "./components/About"
import Skills from "./components/Skills"
import Contact from "./pages/ContactPage"
import Footer from "./components/Footer"
import NotFound from "./pages/NotFoundPage"
import ProjectsPage from './pages/ProjectsPage'
import './App.css'
function App() {
  const skills = ["Java", "Flutter", "Database", "Python", "Machine Learning"];
  const projects = ["AI Assistant App", "JobFlow App"];
  const [message, setMessage] = useState("");          // useState #2: controlled form input
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Header name="Diya Shah" />
            <About />
            <Skills skillsList={skills} />
          </>
        } />
        <Route path="/projects" element={<ProjectsPage />} />
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