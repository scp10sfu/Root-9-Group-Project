// GithubBadge.js

import React from 'react';
import PropTypes from 'prop-types';
import './GithubBadge.css';
import { ReactComponent as GithubIcon } from '../images/icon-github.svg';
import Layout from '../Components/Layout';


const GitHubBadge = ({ username, name, link }) => {
    return (
        <div className="github-badge glassmorphic-with-boarder col-xs-18 col-md-9">
            <div className="github-column">
                <div className="github-badge-icon col-xs">
                    <GithubIcon alt="GitHub Icon" style={{ width: '45px', height: '45px' }} />
                </div>
            </div>
            <div className="github-column github-info">
                <a href={`https://github.com/${username}`} className='github-username' target="_blank" rel="noopener noreferrer">
                    @{username}
                </a>
                {/* <div className="github-username">@{username}</div> */}
                <span className="github-name">{name}</span>
            </div>
        </div>
    );
};

GitHubBadge.propTypes = {
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
};

export default GitHubBadge;
