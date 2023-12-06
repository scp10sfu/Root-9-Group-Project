// GithubBadge.js

import React from 'react';
import PropTypes from 'prop-types';
import './GithubBadge.css';
import { ReactComponent as GithubIcon } from '../images/icon-github.svg';
import Layout from '../Components/Layout';


const GitHubBadge = ({ username, name, link }) => {
    return (
        <a href={`https://github.com/${username}`} className="github-badge col-xs-36 col-md-9">
            <div className="github-column">
                <div className="github-badge-icon col-xs-12 col-md-2">
                    <GithubIcon alt="GitHub Icon" style={{ width: '40px', height: '40px' }} />
                </div>
            </div>
            <div className="github-column github-info col-xs-24 col-md-7">
                <span className="github-name">{name}</span>
                <div className='github-username' target="_blank" rel="noopener noreferrer">
                    @{username}
                </div>
                {/* <div className="github-username">@{username}</div> */}
                
            </div>
        </a>
    );
};

GitHubBadge.propTypes = {
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
};

export default GitHubBadge;
