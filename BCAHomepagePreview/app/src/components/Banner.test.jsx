import React from 'react';
import {render, fireEvent, cleanup} from '@testing-library/react';
import Banner from './Banner';

afterEach(cleanup);

describe('Banner component', () => {
    const image = {
        url: "/full"
    };

    const tabletImage = {
        url: "/tablet"
    };

    const mobileImage = {
        url: "/mobile"
    };

    const smallMobileImage = {
        url: "/smallMobile"
    };

    const link = {
        url: "http://example.com",
        OpenInNewWindow: true
    };
    
    const top = "<h3>Check your property with</h3>";
    const middle = "<h2>Assessment Search</h2>";
    const bottom = "<h3>and compare it to others</h3>";
    let Banners = [];
    const banner = {
        Image: image,
        TabletImage: tabletImage,
        MobileImage: mobileImage,
        SmallMobileImage: smallMobileImage,
        Top: top,
        Middle: middle,
        Bottom: bottom,
        Link: link,
    }
    const iconStyles = {};

    const goToPrevSlide = () => {};
    const goToNextSlide = () => {};
    const buttonStyles = () => {};

    Banners.push(banner);
    const rootUrl = "http://example.com";
    const performRender = () => {
        return render(
            <Banner activeBanner={Banners[0]} RootUrl={rootUrl}>
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
            </Banner>
        );

    }
    
    it('banner text renders successfully', () => {

        const { getByText } = performRender();

        expect(getByText(/Check your/i).textContent).toBe("Check your property with");    
    })

    it('Banner image changes when screen is resized', () => {
        const { container } = performRender();
        
        expect(container.querySelector('[class="bannerlightfamily"]').getAttribute("style")).toBe("background-image: url(" + rootUrl + image.url + ");");
        window.innerWidth = 700;
        fireEvent(window, new Event('resize'));
        expect(container.querySelector('[class="bannerlightfamily"]').getAttribute("style")).toBe("background-image: url(" + rootUrl + tabletImage.url + ");");
        window.innerWidth = 400;
        fireEvent(window, new Event('resize'));
        expect(container.querySelector('[class="bannerlightfamily"]').getAttribute("style")).toBe("background-image: url(" + rootUrl + mobileImage.url + ");");
        window.innerWidth = 200;
        fireEvent(window, new Event('resize'));
        expect(container.querySelector('[class="bannerlightfamily"]').getAttribute("style")).toBe("background-image: url(" + rootUrl + smallMobileImage.url + ");");
    })
});
