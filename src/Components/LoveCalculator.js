import React,{useEffect,useRef,useState} from 'react';
import {BACKEND_URL,NOTIFICATION_CLOSE_TIME,NOTIFICATION_THEME} from "../Constants/Config";
import { ToastContainer, toast ,Zoom} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideNavbar from "./SideNavbar";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import ImageCoursel from "./ImageCoursel";
import {LoveCalculatorMessage} from "../Constants/Messages";
console.log(LoveCalculatorMessage[1]);

function LoveCalculator() {
    const [bNavbarShow, setbNavbarShow] = useState(false);
    const [LoveInfoDetails, setLoveInfoDetails] = useState({});
    const [FirstName, setFirstName] = useState("");
    const [SecondName, setSecondName] = useState("");
    const [LoveDescription,setLoveDescription]=useState("");
    let navRef = useRef(null);
    let handler = (event) => {
        if (!navRef.current.contains(event.target)) {
            setbNavbarShow(false);
        }
    }
    useEffect(() => {
        document.addEventListener("scroll", handler);
        return () => {
            document.removeEventListener("scroll", handler);
        }
    }, [navRef]);

    return (
        <div className="twoDaysHoroscopeMain">
            <Header bNavbarShow={bNavbarShow} setbNavbarShow={setbNavbarShow} ></Header>
            <div ref={navRef}><SideNavbar bNavbarShow={bNavbarShow}></SideNavbar></div>
            <div className="SliderContainer">
                <ImageCoursel></ImageCoursel>
            </div>


            <span className="rankTableHeading">Enter below details and find your love percentage.we will provide you with your love percentage and description corresponding to it.</span>

            <div className="horoscopeformContainer">
                <form onSubmit={(e) => { handleFormSubmit(e) }}>
                    <label className="lbl">Please enter first name</label>
                    <input type="text" placeholder="e.g Deerav" onChange={(e)=>{setFirstName(e.target.value);setLoveInfoDetails({});}}></input>
                    <label className="lbl">Please select your sign</label>
                    <input type="text" placeholder="e.g Gaureesha" onChange={(e)=>{setSecondName(e.target.value);setLoveInfoDetails({});}}></input>
               
                    <button type="submit" className="btnsubmit" >Find Love Details</button>
                </form>
            </div>

            {Object.keys(LoveInfoDetails).length > 0 && <span className="rankTableHeading">Love result for {FirstName} and {SecondName}</span>}
            {Object.keys(LoveInfoDetails).length > 0 && <span className="rankTableHeading loveresult">{LoveInfoDetails.result}</span>}
            {Object.keys(LoveInfoDetails).length > 0 && <div className="horoscopeResultContainer">
                <table id="customers">
                    <tr>{renderResultTableHeader()}</tr>
                    {renderResultTableValues()}
                </table>
            </div>}
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

            <Footer></Footer>
        </div>

    );

    function handleFormSubmit(e)
    {
       e.preventDefault();
       axios.post(`${BACKEND_URL}Love/FindLoveDetails`, { FirstName: FirstName, SecondName: SecondName })
            .then(response => {
                if (response.data.ErrCode === 0) {
                    setLoveInfoDetails(response.data.LoveInfoDetailsJson);
                    let Percentage=parseInt(response.data.LoveInfoDetailsJson.percentage);
                    console.log(response.data.LoveInfoDetailsJson);
                    if(Percentage<=20)
                    {
                     setLoveDescription(LoveCalculatorMessage[0]);
                    }
                    else if(Percentage>20 && Percentage<=40)
                    {
                        setLoveDescription(LoveCalculatorMessage[1]);
                    }
                    else if(Percentage>40 && Percentage<=60)
                    {
                       
                        setLoveDescription(LoveCalculatorMessage[2]);
                    }
                    else if(Percentage>60 && Percentage<=80)
                    {
                       
                        setLoveDescription(LoveCalculatorMessage[3]);
                    }
                    else
                    {
                        setLoveDescription(LoveCalculatorMessage[4]);
                        
                    }
                }
                else if (response.data.ErrCode === 1) {
                    toast.info(response.data.ResMsg);
                }
                else {
                    toast.error(response.data.ResMsg);
                }
            })
            .catch(err => {
                console.log(err);

                toast.error(err.message);
            })

    }

    function renderResultTableHeader()
    {
        return ["PARAMETER NAME","PARAMETER VALUE"].map((param,index)=>{
           return <th key={index}>{param}</th>

        })
    }

    function renderResultTableValues()
    {
       return <>
        <tr>
            <td>First Name</td>
            <td>{FirstName}</td>
        </tr>
        <tr>
            <td>Second Name</td>
            <td>{SecondName}</td>
        </tr>
        <tr>
            <td>Love Percentage</td>
            <td>{LoveInfoDetails.percentage}</td>
        </tr>
        <tr>
            <td>Description for your Love life</td>
            <td>{LoveDescription}</td>
        </tr>
        </>
    }
}

export default LoveCalculator;
