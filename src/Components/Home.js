import React, { useState,useEffect,useRef} from 'react';
import ImageCoursel from "./ImageCoursel";
import "../styles/Navbar.css";
import SideNavbar from "./SideNavbar";
import Header from "./Header";
import Footer from "./Footer";
import QuoteContainer from "./QuoteContainer";
import TypeWriterMessageContainer from "./TypeWriterMessageContainer";
import { MessageArray } from "../Constants/Messages";
import Home1 from "../images/Home3.jpg";
import Home2 from "../images/love1.jpg";
import Home3 from "../images/Zodaic1.jpg";
import Home4 from "../images/Home4.jpg";
import Home5 from "../images/Home5.jpg";
import SugarBrownie from "../images/SugarBrownie.gif";
import axios from "axios";
import { BACKEND_URL} from "../Constants/Config";
import Loader from "./Loader";

function Home() {
    const [bNavbarShow, setbNavbarShow] = useState(false);
    const [bLoaderShow, setbLoaderShow] = useState(true);
    const [QuoteJson,setQuoteJson]=useState({});
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
    }, [navRef]);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}Quote/getRandomQuote`)
        .then(response => {
            setbLoaderShow(false);
            if (response.data.ErrCode === 0) {
                setQuoteJson(response.data.QuoteJson)
            }
        })
        .catch(err => {
            setbLoaderShow(false);
            }) 
    });

    const ImageArray=[Home1,Home2,Home3,Home4,Home5];
    return (
        <div className="classNavbar">
            <Loader bLoaderShow={bLoaderShow}></Loader>
            <Header bNavbarShow={bNavbarShow} setbNavbarShow={setbNavbarShow} ></Header>

            <div ref={navRef}><SideNavbar bNavbarShow={bNavbarShow}></SideNavbar></div>
            <div className="SliderContainer">
                <ImageCoursel ImageArray={ImageArray}></ImageCoursel>
       
            </div>
            <span className="rankTableHeading">You are not men by showing your attitude and power, You can be a good men by showing love and care to your girl.Like brownie,he is carrying sugar on his back and fullfils her tantrums</span>

            <div className="GifPlayerHome">
             <img style={{height:"100%",width:"100%"}} src={SugarBrownie}></img>
            </div>
       

            <main>

          


                <div className="mainContainer">
                     <span className="rankTableHeading">You can read the below points which describe about the functionalities of this website.</span>
                    <TypeWriterMessageContainer title="About Gaureesha" msgArray={MessageArray}></TypeWriterMessageContainer>
           
                    <span className="rankTableHeading">Every time you refresh the page or visit the website again below quote will be changed.</span>
                    <QuoteContainer QuoteJson={QuoteJson}></QuoteContainer>
                 </div>
            </main>
            <Footer></Footer>

        </div>
    )
}

export default Home;
