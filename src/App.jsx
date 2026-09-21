import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import PageLoader from './components/PageLoader'
import './App.css'

// Helper: Minimum delay fallback (Practical 8 Supplementary requirement: avoids flicker & enables clear demonstration)
function lazyWithDelay(importPromise, delay = 800) {
  return lazy(() =>
    Promise.all([
      importPromise(),
      new Promise((resolve) => setTimeout(resolve, delay))
    ]).then(([moduleExports]) => moduleExports)
  );
}

// Practical 8: Route-based Code Splitting using React.lazy()
const Home = lazyWithDelay(() => import('./pages/Home'), 500)
const ProjectsPage = lazyWithDelay(() => import('./pages/ProjectsPage'), 800)
const ContactPage = lazyWithDelay(() => import('./pages/ContactPage'), 800)
const TasksPage = lazyWithDelay(() => import('./pages/TasksPage'), 800)
const LoginPage = lazyWithDelay(() => import('./pages/LoginPage'), 600)
const RegisterPage = lazyWithDelay(() => import('./pages/RegisterPage'), 600)
const NotFound = lazyWithDelay(() => import('./pages/NotFoundPage'), 500)

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <Suspense fallback={<PageLoader routeName="home.view" message="Loading Home chunk..." />}>
            <Home />
          </Suspense>
        } />
        <Route path="/projects" element={
          <Suspense fallback={<PageLoader routeName="projects.md" message="Fetching ProjectsPage.chunk.js on-demand..." />}>
            <ProjectsPage />
          </Suspense>
        } />
        <Route path="/login" element={
          <Suspense fallback={<PageLoader routeName="auth.login" message="Loading LoginPage chunk..." />}>
            <LoginPage />
          </Suspense>
        } />
        <Route path="/register" element={
          <Suspense fallback={<PageLoader routeName="auth.register" message="Loading RegisterPage chunk..." />}>
            <RegisterPage />
          </Suspense>
        } />
        <Route path="/tasks" element={
          <ProtectedRoute>
            <Suspense fallback={<PageLoader routeName="tasks.live" message="Loading TasksPage chunk (Task Manager)..." />}>
              <TasksPage />
            </Suspense>
          </ProtectedRoute>
        } />
        <Route path="/contact" element={
          <Suspense fallback={<PageLoader routeName="contact.js" message="Loading ContactPage chunk..." />}>
            <ContactPage />
          </Suspense>
        } />
        <Route path="*" element={
          <Suspense fallback={<PageLoader routeName="404.view" message="Loading NotFound chunk..." />}>
            <NotFound />
          </Suspense>
        } />
      </Routes>
      <Footer />
    </AuthProvider>
  )
}

export default App