import React, { useState,useEffect,useRef} from 'react';
import Header from './Header';
import SideNavbar from './SideNavbar';
import Footer from './Footer';
import TypeWriterMessageContainer from "./TypeWriterMessageContainer";
import { QuizUrlArray } from "../Constants/Messages";
import { FaCopy } from "react-icons/fa";
import { useHistory } from "react-router";
import {FRONTEND_URL,NOTIFICATION_CLOSE_TIME,NOTIFICATION_THEME} from "../Constants/Config";
import "../styles/CreateQuiz.css";
import { ToastContainer, toast ,Zoom} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function QuizUrl() {
    const [bNavbarShow, setbNavbarShow] = useState(false);
    const history = useHistory({});
    let navRef=useRef(null);
    let handler=(event)=>{
        if(!navRef.current.contains(event.target))
        {
            setbNavbarShow(false);
        }
    }
    useEffect(() => {
       document.addEventListener("scroll",handler);
       return ()=>{
           document.removeEventListener("scroll",handler);
       }
    }, [navRef])
    var QuizUrl=" ";
    if(history.location.state && history.location.state.CretorName && history.location.state.UniqueIdentifier)
    {
     QuizUrl = `${FRONTEND_URL}Quiz/GiveQuizTest/${history.location.state.CretorName}/${history.location.state.UniqueIdentifier}`;
    }
    else
    {
      history.push("/Quiz/CreateQuiz");
    }
    return (
        <div className="QuizUrlContainer">
            <Header bNavbarShow={bNavbarShow} setbNavbarShow={setbNavbarShow} ></Header>
            <div ref={navRef} ><SideNavbar  bNavbarShow={bNavbarShow}></SideNavbar></div>
            <div className="mainC">
                {history.location.state && history.location.state.CretorName && history.location.state.UniqueIdentifier && <div className="mainContainer">
                    <TypeWriterMessageContainer title="Congratulations your quiz has been created!!" msgArray={QuizUrlArray}></TypeWriterMessageContainer>
                    <div className="quoteContainer">
                        <div className="quoteTitleurl">
                            <p>"Your Quiz URL is Ready"</p>

                        </div>
                        <hr></hr>
                        <div className="quoteTxturl">
                            <p>{QuizUrl}</p>
                            <button className="copybtn" onClick={() => {
                                if(navigator.clipboard && window.isSecureContext)
                                {
                                navigator.clipboard.writeText(`${QuizUrl}`).then(toast.success("Url succuessfully copied"),function(){toast.error("failed to copy the Url")}) 
                                }
                                else
                                {
                                    toast.error("Failed to copy the Url.Please copy manually");
                                }
                              
                                 }}>Copy <FaCopy></FaCopy></button>

                        </div>
                    </div>
                </div>}
            </div>
            <Footer></Footer>
            
            <ToastContainer position="top-right"
                        autoClose={NOTIFICATION_CLOSE_TIME}
                        hideProgressBar={false}
                        newestOnTop={true}
                        closeOnClick
                        rtl={false}
                        theme={NOTIFICATION_THEME}
                        transition={Zoom}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover /> 
        </div>
    )
}

export default QuizUrl;
