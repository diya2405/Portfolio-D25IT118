import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import PageLoader from './components/PageLoader'
import './App.css'

function lazyWithDelay(importPromise, delay = 800) {
  return lazy(() =>
    Promise.all([
      importPromise(),
      new Promise((resolve) => setTimeout(resolve, delay))
    ]).then(([moduleExports]) => moduleExports)
  );
}

// Route-based Code Splitting using React.lazy()
const Home = lazyWithDelay(() => import('./pages/Home'), 400)
const ProjectsPage = lazyWithDelay(() => import('./pages/ProjectsPage'), 800)
const ContactPage = lazyWithDelay(() => import('./pages/ContactPage'), 800)
const TasksPage = lazyWithDelay(() => import('./pages/TasksPage'), 800)
const CachePage = lazyWithDelay(() => import('./pages/CachePage'), 600)
const LoginPage = lazyWithDelay(() => import('./pages/LoginPage'), 600)
const RegisterPage = lazyWithDelay(() => import('./pages/RegisterPage'), 600)
const NotFound = lazyWithDelay(() => import('./pages/NotFoundPage'), 400)

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
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </AuthProvider>
  )
}

export default App