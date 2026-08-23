import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Header from "./components/Header"
import Navbar from "./components/Navbar"
import About from "./components/About"
import Skills from "./components/Skills"
import Contact from "./pages/ContactPage"
import Footer from "./components/Footer"
import NotFound from "./pages/NotFoundPage"
import ProjectsPage from './pages/ProjectsPage'
import TasksPage from './pages/TasksPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import './App.css'

function App() {
  const skills = ["Java", "Flutter", "Database", "Python", "Machine Learning"];

  return (
    <AuthProvider>
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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/tasks" element={
          <ProtectedRoute>
            <TasksPage />
          </ProtectedRoute>
        } />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </AuthProvider>
  )
}
export default App