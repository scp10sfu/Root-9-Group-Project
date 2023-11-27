import React, { useState, useRef, useEffect } from 'react';
import Layout from '../Components/Layout';
import './About.css'; // This imports the CSS file directly, no 'styles' object is 
import image1 from '../images/paleta2.png';

function About () {
    const [backgroundStyle, setBackgroundStyle] = useState({});

    return (
        <div className="ColourExtractor" style={backgroundStyle}>
            <div className="background">
                {Array.from({ length: 20 }, (_, i) => (
                    <span key={i} style={{ color: `var(--color${i + 1})` }}></span>
                ))}
            </div>

            <section id="about" className="about-section">
                <div className="section-content">
                    <div className="section-header">
                        <p className="section-text">Get To Know More</p>
                        <h1 className="title">About Us</h1>
                    </div>
                    <div className="about-main">
                        <div className="about-image-container">
                            <img src={image1} alt="Paleta" className="about-pic" />
                        </div>
                        <div className="about-details">
                            <div className="overview">
                                <h3>Overview</h3>
                                <p>Our project is designed to cater to visual artists and individuals seeking creative inspiration.</p>
                            </div>
                            <div className="features">
                                <ol>
                                    <li>
                                        <h4>Image-Based Colour Extraction</h4>
                                        <p>Extract dominant colours from user-uploaded images, and identify and organize them into visually appealing palettes.</p>
                                    </li>
                                    <li>
                                        <h4>Prompt-Driven Palette Generation</h4>
                                        <p>Generate colour palettes based on text prompts through a chat interface for a dynamic and personalized user experience.</p>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default About;
