import React, { useState} from 'react';
import ImageCoursel from "./ImageCoursel";
import "../styles/Navbar.css";
import SideNavbar from "./SideNavbar";
import Header from "./Header";
import Footer from "./Footer";
import QuoteContainer from "./QuoteContainer";
import TypeWriterMessageContainer from "./TypeWriterMessageContainer";
import { MessageArray } from "../Constants/Messages";


function Home() {
    const [bNavbarShow, setbNavbarShow] = useState(false);
    return (
        <div className="classNavbar">
            <Header bNavbarShow={bNavbarShow} setbNavbarShow={setbNavbarShow} ></Header>

            <SideNavbar bNavbarShow={bNavbarShow}></SideNavbar>

            <div className="SliderContainer">
                <ImageCoursel></ImageCoursel>
            </div>

            <main>


                <div className="mainContainer">

                    <TypeWriterMessageContainer title="Love Message" msgArray={MessageArray}></TypeWriterMessageContainer>
                    <QuoteContainer></QuoteContainer>

                </div>
            </main>


            <Footer></Footer>

        </div>
    )
}

export default Home;
