import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const [darkMode, setDarkMode] = useState(false); // toggles theme
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
    <nav className="navbar">
      <span className="mono brand">diya.dev</span>
      <ul>
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/projects">Projects</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
        <li><NavLink to="/tasks">Tasks</NavLink></li>
        {token && <li><NavLink to="/cache">Cache Demo</NavLink></li>}
        {token ? (
          <li>
            <button className="nav-logout" onClick={handleLogout}>
              Logout
            </button>
          </li>
        ) : (
          <li><NavLink to="/login">Login</NavLink></li>
        )}
      </ul>
      <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>
    </nav>
  );
}
export default Navbar;