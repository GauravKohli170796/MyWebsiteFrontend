import React from 'react';
import "../styles/Navbar.css";

function Footer() {
    return (
        <footer>
                <div className="grid-container">
                    <div className="grid-ele" style={{ gridRow: "1/2" }}>DEVELOPED BY,</div>
                    <div className="grid-ele" style={{ gridRow: "2/3" }}>Gaurav Kohli (NIT Kurukshetra | Software Developer at Pine Labs)
                    </div>
                    <div className="grid-ele" style={{ gridRow: "3/4" }}>© COPYRIGHT</div>
                    <div className="grid-ele" style={{ gridRow: "4/5" }}>All Rights Reserved</div>

                </div>
        </footer>
    )
}
export default Footer;
