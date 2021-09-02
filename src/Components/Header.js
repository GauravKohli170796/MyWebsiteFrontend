import React from 'react';
import { FaBars } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import "../styles/Navbar.css";

function Header(props) {
    return (
        <header>
        <div className="headIcon">
            <button className="btn" onClick={() => {
                props.setbNavbarShow(!props.bNavbarShow);
            }}>{props.bNavbarShow ===true ? <FaTimes></FaTimes> : <FaBars></FaBars>}</button>
            <span className="webTitle"><span className="red">❤</span> Gaureesha.com <span className="red">❤</span></span>

        </div>
    </header>
    )
}

export default Header;
