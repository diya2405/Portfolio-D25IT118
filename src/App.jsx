import './App.css'

import Header from "./components/Header"
import Navbar from "./components/Navbar";
import About from "./components/About"
import Skills from "./components/Skills"
import Projects from "./components/Projects"
import Contact from "./components/Contact"
import Footer from "./components/Footer"

function App() {

  const skills = [
    "Java",
    "Flutter",
    "Database",
    "Python",
    "Machine Learning"
  ];

  const projects=[
    "AI Assistant App",
    "JobFlow App"
  ]
  return(
   <>
  <Navbar />
  <Header name="Diya Shah" />
  <About />
  <Skills skillsList={skills} />
  <Projects projectlist={projects} />
  <Contact />
  <Footer />
</>
  )
}

export default App
