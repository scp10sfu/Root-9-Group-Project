// About.js

import React, { useState, useRef, useEffect } from 'react';

import BackgroundColour from '../Components/BackgroundColour';
import Layout from '../Components/Layout';
import GithubBadge from '../Components/GithubBadge';
import { ReactComponent as GithubIcon } from '../images/icon-github.svg';

import './MainStyle.css';

function About() {
    const [backgroundStyle, setBackgroundStyle] = useState({});

    useEffect(() => {
        // Retrieve saved background state from local storage
        const savedBackground = JSON.parse(localStorage.getItem('savedBackground'));

        // Set default background colors
        if (savedBackground) {
            setBackgroundStyle(savedBackground);
        } else {
            setBackgroundStyle({ color1: '#000000', color2: '#000000', color3: '#000000', color4: '#000000', color5: '#000000', color6: '#000000', color7: '#000000', color8: '#000000', color9: '#000000', color10: '#000000', color11: '#000000', color12: '#000000', color13: '#000000', color14: '#000000', color15: '#000000', color16: '#000000', color17: '#000000', color18: '#000000', color19: '#000000', color20: '#000000' });
        }
    }, []);

    

    return (
        <div className="ColourExtractor" style={backgroundStyle}>
            <div className="background">
                {Array.from({ length: 20 }, (_, i) => (
                    <span key={i} style={{ color: `var(--color${i + 1})` }}></span>
                ))}
            </div>

            <Layout>
                <div className="grid-container general">
                    <div className="col-xs-36 col-md-36"></div>


                    <div className="col-xs-36-center col-md-36-center">
                        <header className="text_block_text">About Us</header>
                        <header className="text_block_subtext">Get To Know More</header>
                    </div>

                    <div className="col-xs-36 col-md-36 grid-container nested-grid">
                        <div className="col-xs-36 col-md-8">
                            <div className="left-title">Overview</div>
                        </div>
                        <div className="block col-xs-36 col-md-28">
                            <div className="content-text">Our project is designed to cater to visual artists and individuals seeking creative inspiration.</div>
                        </div>
                    </div>


                    <div className="col-xs-36 col-md-36 grid-container nested-grid">
                        <div className="col-xs-36 col-md-8">
                            <div className="left-title">Main<br />features</div>
                        </div>

                        <div className="block col-xs-36 col-md-28">
                            <div className="col-xs-36 col-md-28">
                                <div className="title">1. Image-Based Colour Extraction</div>
                                <div className="content-text">Extract dominant colours from user-uploaded images, and identify and organize them into visually appealing palettes.</div>
                            </div>
                            <div className="col-xs-36 col-md-28"></div>

                            <div className="col-xs-36 col-md-28">
                                <div className="title">2. Prompt-Driven Palette Generation</div>
                                <div className="content-text">Generate colour palettes based on text prompts through a chat interface for a dynamic and personalized user experience.</div>
                            </div>

                        </div>
                    </div>

                    <div className="col-xs-36-center col-md-36-center">
                        <header className="text_block_text">Contact</header>
                    </div>

                    <div className="col-xs-36 col-md-36 grid-container nested-grid">
                        {/* <div className="col-xs-36 col-md-8"> */}
                            {/* <div className="left-title">Contact<br />us</div> */}
                        {/* </div> */}
                        <div className="block col-xs-36 col-md-36">
                            <div className="content-text">
                                We are a team of four students from the  Simon Fraser University. If you have any questions or feedback, please feel free to reach out to us!
                                {/* <a href="https://www.sfu.ca" target="_blank" rel="noopener noreferrer"> */}
                                {/* </a>.  */}
                            </div>
                        </div>

                        <GithubBadge username="arusinova" name="Anna Rusinova" link="https://github.com/arusinova" />
                        <GithubBadge username="SunIsDark" name="Taiga Okuma" link="https://github.com/SunIsDark" />
                        <GithubBadge username="CindyXiao1" name="Cindy Xiao" link="https://github.com/CindyXiao1" />
                        <GithubBadge username="scp10sfu" name="Stefan Pricope" link="https://github.com/scp10sfu" />
                        
                    </div>

                    <div className="col-xs-36 col-md-36"></div>

                </div>
            </Layout>

        </div>
    );
}

export default About;
