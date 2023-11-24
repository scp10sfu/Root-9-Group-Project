// About.js

import React, {useState} from "react";
import Layout from '../Components/Layout';
import './ColourExtractor.css';

function About () {
    const [backgroundStyle, setBackgroundStyle] = useState({});

    return (
        <div className="ColourExtractor" style={backgroundStyle}>

            <div className="background">
                {Array.from({ length: 20 }, (_, i) => (
                    <span key={i} style={{ color: `var(--color${i + 1})` }}></span>
                ))}
            </div>

            <Layout>

                <div class="grid-container general">

                    <div class="col-xs-36 col-md-36" style={{ textAlign: 'center' }}></div>
                    {/* The main content */}
                    <div class="main-section col-xs-36-center col-md-36-center">
                    <header className="text_block_text">Welcome!</header>
                    </div>

                </div>

            </Layout>
        </div>
    );

};

export default About;