import React from 'react';
import { FaHome } from "react-icons/fa";
import { FaBookReader } from "react-icons/fa";
import { FaBlenderPhone } from "react-icons/fa";
import "../styles/Navbar.css";
import { Link } from 'react-router-dom';

function SideNavbar({bNavbarShow}) {
    return (
        <nav className={bNavbarShow ===true ? "" : "hidden"}>
        <ul>
            <li><div className="navIcons"><FaHome></FaHome></div><Link className="link" activeClassName="active" to="/Home">Home</Link></li>
            <li><div className="navIcons"><FaBookReader></FaBookReader></div><Link className="link" activeClassName="active" to="/Quiz/CreateQuiz">Create Quiz</Link></li>
            <li><div className="navIcons"><FaBlenderPhone></FaBlenderPhone></div><Link className="link" activeClassName="active" to="/">Create Quiz</Link></li>

        </ul>
    </nav>
    )
}

export default SideNavbar;
