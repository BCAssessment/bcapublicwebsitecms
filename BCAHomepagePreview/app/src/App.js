import React, { useState, useEffect } from 'react';
import axios from 'axios';

import BannerCarousel from './components/Carousel';

require('dotenv').config();

function App() {

  const [Banners, setBanners] = useState([]);

  const returnSorted = (data) => {
    console.log("DATA: ", data);
    if (data.length === 1) { 
      return data[0];     
    }
    const sortedData = data.sort((a, b) => {
      const aPublishDate = new Date(a.published_at);
      const bPublishDate = new Date(b.published_at);
      return bPublishDate - aPublishDate;
    })
    return sortedData[0];
  }

  const createBannersArray = (newest) => {
    let banners = [];
    for (const key in newest) {
        if (key.includes("Banner")) {
            banners.push(newest[key]);
        }
    }
    return banners;
  }

  let strapi_endpoint = process.env.REACT_APP_STRAPI_API_ENDPOINT;
  let prod_banners = process.env.REACT_APP_PROD_BANNERS;
  let strapi_root = process.env.REACT_APP_STRAPI_ROOT;

  if(strapi_endpoint) {
    if(prod_banners === "true") {
      strapi_endpoint = strapi_endpoint + "?_publicationState=live";
    } else {
      strapi_endpoint = strapi_endpoint + ("?_publicationState=preview");
    }
  }

  useEffect(() => {   
    axios.get(strapi_endpoint)
      .then(data => {
        const sorted = returnSorted(data.data);
        let BannersArr = createBannersArray(sorted)
        setBanners(BannersArr);
      })
      .catch(console.error)
  }, []);

  return (
    Banners.length ? 
    <BannerCarousel Banners={Banners} RootUrl={strapi_root}></BannerCarousel>
    : null
  )
}

export default App;
