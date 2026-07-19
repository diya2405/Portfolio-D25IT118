import { NavLink } from 'react-router-dom';

function Navbar(){
    return(
        <nav className="navbar">
            <ul>
                <li><NavLink to="/" end>Home</NavLink></li>
                <li><NavLink to="/projects">Projects</NavLink></li>
                <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>
        </nav>
    )
}

export default Navbar;