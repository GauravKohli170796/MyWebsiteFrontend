import React from 'react';
import { FaBars } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import "../styles/Navbar.css";
import { useHistory } from "react-router-dom";

function Header(props) {
    const history=useHistory();
    return (
        <header>
        <div className="headIcon">
            <button className="btn" onClick={() => {
                props.setbNavbarShow(!props.bNavbarShow);
            }}>{props.bNavbarShow ===true ? <FaTimes></FaTimes> : <FaBars></FaBars>}</button>
            <span className="webTitle"><span className="red">❤</span> <button className="mainHeaderstyle" onClick={()=>{history.push('/Home')}}>Gaureesha.com</button><span className="red">❤</span></span>

        </div>
    </header>
    )
}

export default Header;
