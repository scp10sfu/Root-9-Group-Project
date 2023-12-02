// NotFoundPage.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as ArrowIcon } from '../images/icon-arrow-long.svg';
import Layout from '../Components/Layout';
import './MainStyle.css';

const NotFoundPage = () => {
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
                    <div className="col-xs-36 col-md-36"></div>
                    <div className="col-xs-36 col-md-36"></div>


                    <div className="col-xs-36-center col-md-36-center">
                        <header className="text_block_text">Oops! You seem to be lost.</header>
                        {/* <header className="text_block_subtext" style={{ fontSize: '2em' }}>Here are some helpful links:</header> */}
                    </div>

                    <div className="col-xs-36 col-md-36"></div>

                    <div className="wrapper-2-col col-xs-36-center col-md-36-center">
                        <Link className="links" to="/ColourExtractor">Go to Colour Extractor <ArrowIcon style={{ width: '30px', height: '30px' }} /></Link>
                        <Link className="links" to="/PaletteGenerator">Go to AI Palette Generator <ArrowIcon style={{ width: '30px', height: '30px' }} /></Link>
                    </div>
                </div>

                <div className="col-xs-36 col-md-36"></div>
            </Layout>

        </div>
    );
}

export default NotFoundPage;