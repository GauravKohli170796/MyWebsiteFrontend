import React from 'react';
import "../styles/Navbar.css";
import { Typewriter } from 'react-simple-typewriter';

function TypeWriterMessageContainer({title,msgArray}) {
    return (
       

        <div className="MessageContainer">
        <div className="messageTitle">
            <p>"{title}"</p>

        </div>
        <div className="messageTxt">
            <p><Typewriter
                words={msgArray}
                loop={100}
                cursor
                cursorStyle='|'
                deleteSpeed={8}
                typeSpeed={80}
                delaySpeed={100}
             /></p>

        </div>
    </div>
    )
}
export default TypeWriterMessageContainer;
