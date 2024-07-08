import React from 'react';

import Header from '../Home-Components/Header/Header';
import Footer from '../Home-Components/Footer/Footer';
import Heading from './Heading/Heading';
import Carousel from './Carousel/Carousel';
import PFB from './PortfolioBuisness/PFB';
import PFP from './PortfolioPersonal/PFP';
import Video from './Video/Video';
import Thoughts from './Thoughts/Thoughts';
import Sharing from './Sharing/Sharing';
import Why from './Why/Why';
import Slogan from './Slogan/Slogan';


const AboutUs = () => {
  return (
    <div>
        <Header/>
        <Heading/>
        <Carousel/>
        <PFB/>
        <PFP/>
        <Video/>
        <Sharing/>
        <Carousel/>
        <Thoughts/>
        <Why/>
        <Slogan/>
        <Footer/>
    </div>
  )
}

export default AboutUs;