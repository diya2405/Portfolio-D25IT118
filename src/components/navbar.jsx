import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const [darkMode, setDarkMode] = useState(false); // toggles theme

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <nav className="navbar">
      <span className="mono brand">diya.dev</span>
      <ul>
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/projects">Projects</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
      </ul>
      <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>
    </nav>
  );
}
export default Navbar;