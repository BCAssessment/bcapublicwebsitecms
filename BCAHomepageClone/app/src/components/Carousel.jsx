import React, { useState, useEffect } from 'react';
import Banner from './Banner';

require('dotenv').config();

export default function BannerCarousel(props) {

  const [Banners, setBanners] = useState(props.Banners)
  const [activeIndex, setActiveIndex] = useState(0);
  const [lengthOfBanners, setLengthOfBanners] = useState(props.Banners.length);

  const buttonStyles = (direction) => {
    const styles = {
      border: "none", 
      height: "4rem", 
      width: "4rem",
      background: "#fff", 
      borderRadius: "50%", 
      position: "absolute", 
      top: "50%", 
      zIndex:"100", 
      outline: "white", 
      fontWeight: "bold"
    }
    styles[direction] = 0;
    return styles;
  }

  const iconStyles = {color: "#07819a", fontWeight: "bold", size: "9x"};

  const goToNextSlide = (e) => {
    let index = activeIndex;
    let length = lengthOfBanners;
    if (index === length - 1) {
      index = 0
    } else {
      index++;
    }
    setActiveIndex(index);
  }

  const goToPrevSlide = () => {
    let index = activeIndex;
    let length = lengthOfBanners;
    if(index === 0) {
      index = length - 1;
    } else {
      index--;
    }
    setActiveIndex(index);
  }

  useEffect(() => {
    const autoPlay = setTimeout(goToNextSlide, 3000)
    return () => {
      // Stop the interval when the component unmounts. 
      // Otherwise it will keep going and the banners won't be smooth and will eventually crash the browser!
      clearTimeout(autoPlay);
    }
}, [activeIndex])

    return (
        (Banners.length ?
        <div className="outer">
          <div  className="App" style={{position: "relative"}}>
            <Banner activeBanner={Banners[activeIndex]} RootUrl={props.RootUrl}/>
            <button 
              className="prev" 
              onClick={goToPrevSlide} 
              style={buttonStyles("left")}
              >
                <i style={iconStyles} className="fas fa-chevron-left"></i>
            </button>
            <button 
              className="next" 
              onClick={goToNextSlide} 
              style={buttonStyles("right")}
              >
                <i style={iconStyles} className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
        : null)
    )
}