import React from 'react';
import Home1 from "../images/Home1.jpg";
import Home2 from "../images/Home2.jpg";
import Home3 from "../images/Home3.jpg";
import Home4 from "../images/Home4.jpg";
import Home5 from "../images/Home5.jpg";
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

function ImageCoursel() {
      const properties = {
        autoplay: true,
        arrows: false,
        duration:2000,
        indicators:true,
        pauseOnHover:true
      };
    
    return (
        <div className="slide-container">
          <Fade {...properties}>
            <div className="each-fade">
              <div className="image-container">
                <img src={Home1} alt="Image1"/>
              </div>
            </div>
            <div className="each-fade">
              <div className="image-container">
                <img src={Home2} alt="Image2"/>
              </div>
            </div>
            <div className="each-fade">
              <div className="image-container">
                <img src={Home3} alt="Image3"/>
              </div>
            </div>
            <div className="each-fade">
              <div className="image-container">
                <img src={Home4} alt="Image4"/>
              </div>
            </div>
            <div className="each-fade">
              <div className="image-container">
                <img src={Home5} alt="Image5"/>
              </div>
            </div>
          </Fade>
        </div>
      )
}

export default ImageCoursel;
