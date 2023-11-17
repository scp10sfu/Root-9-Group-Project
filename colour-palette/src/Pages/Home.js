// Home.js

import React from 'react';
import Layout from '../Components/Layout';
// import { NavigationBar } from "../Components/NavigationBar";

const Home = () => {

  return (
    <Layout>

      {/* <main class="container">
  <section class="row">

    <div class="col-12 md-col-3 lg-col-3">
      <div class="item">
      <h1>Welcome to the Homepage!  lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum</h1>
      </div>
    </div>

    <div class="sm-col-12 md-col-6 lg-col-3">
      <div class="item">
      <h3>TEST! Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum</h3>
      </div>
    </div>

    <div class="col-12 md-col-6 lg-col-3">
      <div class="item">
      <h1>Welcome to the Homepage! lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum</h1>
      <h3>TEST!</h3>
      </div>
    </div>

    <div class="col-12 md-col-6 lg-col-3">
      <div class="item">
      <h1>Welcome to the Homepage! lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum</h1>
      <h3>TEST!</h3>
      </div>
    </div>
  </section>
</main> */}

  {/* <NavigationBar /> */}

      <div class="grid-container general-demo">
        {/* The nav bar */}
        <div class="logo col-xs-2 col-md-2"></div>
        <div class="header col-xs-10 col-md-10"></div>

        {/* The main content - left part */}
        <div class="main-section col-xs-12 col-md-5 grid-container nested-grid">
          <div class="col-xs-12 col-md-12 grid-container secondary-nested-grid">
            <div class="col-xs-10 col-md-10 grid-container col-xs-offset-2 secondary-nested-grid">

              <div class="col-xs-12">TITLE</div>   {/* Title */}
              <div class="col-xs-12">Subtitle</div>   {/* Extra information */}
              <div class="col-xs-12">Upload image:</div>  {/* Upload image */}
              <div class="col-xs-12">IMAGE:</div>  {/* Upload image */}
              <div class="col-xs-12">Setting number</div>  {/* Setting number */}
            </div> 
           
          </div>
        </div>

        {/* The main content - right part: DOMINANT COLOURS */}
        <div class="secondary-section col-xs-12 col-md-7 grid-container nested-grid">
          {/* First dominant colour */}
          <div class="col-xs-12 col-md-6"></div>
          {/* Second dominant colour */}
          <div class="col-xs-12 col-md-6"></div>
        </div>

     
        {/* <div class="secondary-section col-xs-12 col-md-7 grid-container nested-grid">
          <div class="col-xs-12 col-md-12"></div>
        </div>

        <div class="secondary-section col-xs-12 col-md-7 grid-container nested-grid">
          <div class="col-xs-12 col-md-6"></div>
          <div class="col-xs-12 col-md-6"></div>
        </div> */}

        {/* 5 colours 
          * TODO: add conditon
          */}
        {/* <div class="secondary-section col-xs-12 col-md-7 grid-container nested-grid">
          <div class="col-xs-12 col-md-4"></div>
          <div class="col-xs-12 col-md-4"></div>
          <div class="col-xs-12 col-md-4"></div>
        </div> */}

{/* 
        <div class="secondary-section col-xs-12 col-md-7 grid-container nested-grid">
          <div class="col-xs-12 col-md-3"></div>
          <div class="col-xs-12 col-md-3"></div>
          <div class="col-xs-12 col-md-3"></div>
          <div class="col-xs-12 col-md-3"></div>
      </div> */}

        <div class="secondary-section col-xs-12 col-md-7 grid-container nested-grid">
          <div class="col-xs-12 col-md-2"></div>
          <div class="col-xs-12 col-md-2"></div>
          <div class="col-xs-12 col-md-2"></div>
          <div class="col-xs-12 col-md-2"></div>
          <div class="col-xs-12 col-md-2"></div>
          <div class="col-xs-12 col-md-2"></div>
        </div>

        <div class="secondary-section col-xs-12 col-md-7 grid-container nested-grid">
          <div class="col-xs-12 col-md-1"></div>
          <div class="col-xs-12 col-md-1"></div>
          <div class="col-xs-12 col-md-1"></div>
          <div class="col-xs-12 col-md-1"></div>
          <div class="col-xs-12 col-md-1"></div>
          <div class="col-xs-12 col-md-1"></div>
          <div class="col-xs-12 col-md-1"></div>
          <div class="col-xs-12 col-md-1"></div>
          <div class="col-xs-12 col-md-1"></div>
        </div>


        {/*
        <div class="secondary-section col-xs-12 col-md-7 grid-container nested-grid">
           <div class="col-xs-12 col-md-2"></div>
          <div class="col-xs-12 col-md-2"></div>
          <div class="col-xs-12 col-md-2"></div>
          <div class="col-xs-12 col-md-2"></div>
          <div class="col-xs-12 col-md-2"></div>
          <div class="col-xs-12 col-md-2"></div>
        </div> */}

      </div>

    </Layout>

  );
};

export default Home;
