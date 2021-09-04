import React from 'react';
import { FaHome } from "react-icons/fa";
import { FaBookReader } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import "../styles/Navbar.css";
import { NavLink} from 'react-router-dom';

function SideNavbar({bNavbarShow}) {
    return (
        <nav className={bNavbarShow ===true ? "" : "hidden"}>
        <ul>
            <li><div className="navIcons"><FaHome></FaHome></div><NavLink  exact activeClassName="active" className="link" to="/Home">Home</NavLink></li>
            <li><div className="navIcons"><FaBookReader></FaBookReader></div><NavLink exact activeClassName="active" className="link"  to="/Quiz/CreateQuiz">Create Quiz</NavLink></li>
            <li><div className="navIcons"><FaSearch></FaSearch></div><NavLink  exact activeClassName="active" className="link"  to="/Horoscope/FindHoroscopeDetails">Find Horoscope Info</NavLink></li>

        </ul>
    </nav>
    )
}

export default SideNavbar;
