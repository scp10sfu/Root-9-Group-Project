// Home.js

import React from 'react';
import Layout from '../Components/Layout';
// import { NavigationBar } from "../Components/NavigationBar";

const Home = () => {

  return (
    <body>
    <Layout>
      {/* <NavigationBar /> */}
      <div class="grid-container general-demo">
        {/* The nav bar */}
        <div class="logo col-xs-6 col-md-6"></div>
        <div class="header col-xs-30 col-md-30"></div>

        {/* The main content - left part */}
        <div class="main-section col-xs-36 col-md-12 grid-container nested-grid">

          {/* <div class="col-xs-36 col-md-24 grid-container secondary-nested-grid"> */}
          {/* <div class="col-xs-36 col-md-25 secondary-nested-grid"> */}

          <div class="col-xs-36 col-md-25">TITLE</div>   {/* Title */}
          <div class="col-xs-36 col-md-25">Subtitle</div>   {/* Extra information */}
          <div class="col-xs-36 col-md-25">Upload image:</div>  {/* Upload image */}
          <div class="col-xs-36 col-md-25">IMAGE:</div>  {/* Upload image */}
          <div class="col-xs-36 col-md-25">Setting number</div>  {/* Setting number */}

          {/* </div>  */}
          {/* </div> */}

        </div>

        {/* The main content - right part: DOMINANT COLOURS */}
        <div class="secondary-section col-xs-36 col-md-24 grid-container nested-grid">
          {/* First dominant colour */}
          <div class="col-xs-36 col-md-18">Dominant colour</div>
          {/* Second dominant colour */}
          <div class="col-xs-36 col-md-18">Dominant colour</div>
        </div>


        {/* 4 colours 
          * TODO: add conditon
          */}
        {/* <div class="secondary-section col-xs-36 col-md-24 grid-container nested-grid">
          <div class="col-xs-36 col-md-18">Colour #3</div>
          <div class="col-xs-36 col-md-18">Colour #4</div>
        </div> */}


        {/* 6 colours 
          * TODO: add conditon
          */}
        {/* <div class="secondary-section col-xs-36 col-md-24 grid-container nested-grid">
          <div class="col-xs-36 col-md-9">Colour #3</div>
          <div class="col-xs-36 col-md-9">Colour #4</div>
          <div class="col-xs-36 col-md-9">Colour #5</div>
          <div class="col-xs-36 col-md-9">Colour #6</div>
        </div> */}

        {/* 8 colours */}
        <div class="secondary-section col-xs-36 col-md-24 grid-container nested-grid">
          <div class="col-xs-36 col-md-6">Colour #3</div>
          <div class="col-xs-36 col-md-6">Colour #4</div>
          <div class="col-xs-36 col-md-6">Colour #5</div>
          <div class="col-xs-36 col-md-6">Colour #6</div>
          <div class="col-xs-36 col-md-6">Colour #7</div>
          <div class="col-xs-36 col-md-6">Colour #8</div>
        </div>

        {/* 10 colours */}
        <div class="secondary-section col-xs-36 col-md-24 grid-container nested-grid">
          <div class="col-xs-36 col-md-9">Colour #3</div>
          <div class="col-xs-36 col-md-9">Colour #4</div>
          <div class="col-xs-36 col-md-9">Colour #5</div>
          <div class="col-xs-36 col-md-9">Colour #6</div>
          <div class="col-xs-36 col-md-9">Colour #7</div>
          <div class="col-xs-36 col-md-9">Colour #8</div>
          <div class="col-xs-36 col-md-9">Colour #9</div>
          <div class="col-xs-36 col-md-9">Colour #10</div>
        </div>

      </div>

    </Layout>
    </body>

  );
};

export default Home;
