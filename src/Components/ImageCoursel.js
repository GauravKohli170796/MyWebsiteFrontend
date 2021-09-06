import React from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

function ImageCoursel({ImageArray}) {
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
                <img src={ImageArray[0]} alt="Image1"/>
              </div>
            </div>
            <div className="each-fade">
              <div className="image-container">
                <img src={ImageArray[1]} alt="Image2"/>
              </div>
            </div>
            <div className="each-fade">
              <div className="image-container">
                <img src={ImageArray[2]} alt="Image3"/>
              </div>
            </div>
            <div className="each-fade">
              <div className="image-container">
                <img src={ImageArray[3]} alt="Image4"/>
              </div>
            </div>
            <div className="each-fade">
              <div className="image-container">
                <img src={ImageArray[4]} alt="Image5"/>
              </div>
            </div>
          </Fade>
        </div>
      )
}

export default ImageCoursel;
