import React, { useState, useRef, useEffect } from 'react';
import SideNavbar from "./SideNavbar";
import Header from "./Header";
import Footer from "./Footer";
import ImageCoursel from "./ImageCoursel";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import { BACKEND_URL, NOTIFICATION_CLOSE_TIME, NOTIFICATION_THEME } from "../Constants/Config";
import 'react-toastify/dist/ReactToastify.css';
import "../styles/Horoscope.css";
import axios from "axios";
import Zodaic1 from "../images/Zodaic1.jpg";
import Zodaic2 from "../images/Zodaic2.jpg";
import Zodaic3 from "../images/Zodaic3.jpg";
import Zodaic4 from "../images/Zodaic4.jpg";
import Zodaic5 from "../images/Zodaic5.jpg";
import Loader from "./Loader";
import PopUps from "./PopUps";



function TwoDaysHoroscope() {
    const [bNavbarShow, setbNavbarShow] = useState(false);
    const [bPopUpShow, setbPopUpShow] = useState(false);
    const [bLoaderShow, setbLoaderShow] = useState(false);
    const [HoroScopeInfo, setHoroScopeInfo] = useState({});
 
    const [Day, setDay] = useState("");
    const [Sign, setSign] = useState("");
    let navRef = useRef(null);
    let handler = (event) => {
        if (navRef.current.contains && !navRef.current.contains(event.target)) {
            setbNavbarShow(false);
        }
    }
    useEffect(() => {
        document.addEventListener("scroll", handler);
        return () => {
            document.removeEventListener("scroll", handler);
        }
    }, [navRef]);


    const ImageArray=[Zodaic1,Zodaic2,Zodaic3,Zodaic4,Zodaic5];
    return (
        <div className="twoDaysHoroscopeMain">
             <Loader bLoaderShow={bLoaderShow}></Loader>
            <Header bNavbarShow={bNavbarShow} setbNavbarShow={setbNavbarShow} ></Header>
            <div ref={navRef}><SideNavbar bNavbarShow={bNavbarShow}></SideNavbar></div>
            <div className="SliderContainer">
                <ImageCoursel ImageArray={ImageArray}></ImageCoursel>
            </div>


            <span className="rankTableHeading">Horoscope info for sun signs such as Lucky Number, Lucky Color, Mood, Color, Compatibility with other sun signs, description of a sign for that day</span>

            <div className="horoscopeformContainer">
                <form onSubmit={(e) => { handleFormSubmit(e) }}>
                    <label className="lbl">Please select day</label>
                    <select defaultValue="" onChange={(e) => { setDay(e.target.value); setHoroScopeInfo({}); }} required>
                        <option value="" disabled>select day</option>
                        <option value="today">Today</option>
                        <option value="tomorrow">Tomorrow</option>
                    </select>
                    <label className="lbl">Please select your sign</label>
                    <select defaultValue="" onChange={(e) => {
                        setSign(e.target.value);
                        setHoroScopeInfo({});
                    }} required>
                        <option value="" disabled>select your sign</option>
                        <option value="Aries">Aries</option>
                        <option value="Taurus">Taurus</option>
                        <option value="Gemini">Gemini</option>
                        <option value="Cancer">Cancer</option>
                        <option value="Leo">Leo</option>
                        <option value="Virgo">Virgo</option>
                        <option value="Libra">Libra</option>
                        <option value="Scorpio">Scorpio</option>
                        <option value="Sagittarius">Sagittarius</option>
                        <option value="Capricorn">Capricorn</option>
                        <option value="Aquarius">Aquarius</option>
                        <option value="Pisces">Pisces</option>

                    </select>
                    <button type="submit" className="btnsubmit" >Find Horoscope</button>
                    <div className="findsign">
                    <div className="slbl">Don't Know Your Sign</div>
                    <button type="button" className="sbtnsubmit" onClick={()=>{setbPopUpShow(true)}}>Find</button>
                    </div>
                </form>
            </div>

            {Object.keys(HoroScopeInfo).length > 0 && <span className="rankTableHeading hororesult">Horoscope result for {Sign} sign for {Day}</span>}
            {Object.keys(HoroScopeInfo).length > 0 && <div className="horoscopeResultContainer">
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
           {bPopUpShow && <PopUps bPopUpShow={bPopUpShow} setbPopUpShow={setbPopUpShow}></PopUps>}
        </div>

    );

    function handleFormSubmit(e) {
        e.preventDefault();
        setbLoaderShow(true);
        axios.post(`${BACKEND_URL}Horoscope/TwoDayHoroscope`, { Day: Day, Sign: Sign })
            .then(response => {
                setbLoaderShow(false);
                if (response.data.ErrCode === 0) {
                    setHoroScopeInfo(response.data.HoroScopeInfoJson);
                    console.log(response.data);
                }
                else if (response.data.ErrCode === 1) {
                    toast.info(response.data.ResMsg);
                }
                else {
                    toast.error(response.data.ResMsg);
                }
            })
            .catch(err => {
                setbLoaderShow(false);
                toast.error(err.message);
            })


    }

    function renderResultTableHeader() {
        return ["S.NO.", "ZODAIC PARAMETER NAME", "ZODAIC PARAMETER VALUE"].map((param, index) => {
            return <th>{param}</th>
        })
    }

    function renderResultTableValues() {
        return Object.keys(HoroScopeInfo).map((param, index) => {
            return <tr>
                <td>{index + 1}</td>
                <td>{param.toUpperCase()}</td>
                <td>{HoroScopeInfo[param]}</td>
            </tr>



        })
    }
}

export default TwoDaysHoroscope;
