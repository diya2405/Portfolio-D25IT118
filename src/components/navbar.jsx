import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <nav className="navbar-modern">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-brand">
          <span className="brand-dot"></span>
          <span className="brand-text">diya<span className="brand-accent">.dev</span></span>
          <span className="brand-tag">D25IT118</span>
        </NavLink>

        <ul className="navbar-links">
          <li><NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink></li>
          <li><NavLink to="/projects" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Projects</NavLink></li>
          <li><NavLink to="/tasks" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Tasks</NavLink></li>
          <li>
            <NavLink to="/cache" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Cache <span className="nav-new-pill" style={{ background: '#f59e0b' }}>P9</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/events" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Events <span className="nav-new-pill">P10</span>
            </NavLink>
          </li>
          <li><NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Contact</NavLink></li>
          {token ? (
            <li>
              <button className="nav-btn-logout" onClick={handleLogout}>
                Logout
              </button>
            </li>
          ) : (
            <li><NavLink to="/login" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Login</NavLink></li>
          )}
        </ul>

        <div className="navbar-actions">
          <button
            className="theme-toggle-modern"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle theme"
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? (
              <span className="theme-toggle-inner">☀️ <span className="theme-text">Light</span></span>
            ) : (
              <span className="theme-toggle-inner">🌙 <span className="theme-text">Dark</span></span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
