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
                typeSpeed={80}
                deleteSpeed={1}
                delaySpeed={10}
                onLoopDone={() => console.log(`Done after 5 loops!`)}

            /></p>

        </div>
    </div>
    )
}
export default TypeWriterMessageContainer;
