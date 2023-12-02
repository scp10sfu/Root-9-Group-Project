import React, { useState, useRef, useEffect } from 'react';
import Layout from '../Components/Layout';
import './MainStyle.css';
import image1 from '../images/paleta2.png';

function About() {
    const [backgroundStyle, setBackgroundStyle] = useState({});

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
                        <div className="wrapper-2-col col-xs-36 col-md-8">
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

                    <div className="col-xs-36 col-md-36"></div>

                </div>
            </Layout>

        </div>
    );
}

export default About;
