import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <span className="mono brand">diya.dev</span>
      <ul>
        <li><NavLink to="/" end>home</NavLink></li>
        <li><NavLink to="/projects">projects</NavLink></li>
        <li><NavLink to="/contact">contact</NavLink></li>
      </ul>
    </nav>
  );
}
export default Navbar;