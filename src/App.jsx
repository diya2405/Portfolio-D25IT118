import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import PageLoader from './components/PageLoader'
import './App.css'

// Fast Route-based Code Splitting using React.lazy() (Practical 8)
const Home = lazy(() => import('./pages/Home'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const TasksPage = lazy(() => import('./pages/TasksPage'))
const CachePage = lazy(() => import('./pages/CachePage'))
const EventsPage = lazy(() => import('./pages/EventsPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const RegisterPage = lazy(() => import('./pages/RegisterPage'))
const NotFound = lazy(() => import('./pages/NotFoundPage'))

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/tasks" element={
            <ProtectedRoute>
              <TasksPage />
            </ProtectedRoute>
          } />
          <Route path="/cache" element={
            <ProtectedRoute>
              <CachePage />
            </ProtectedRoute>
          } />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </AuthProvider>
  )
}

export default App
