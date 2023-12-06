// GithubBadge.js

import React from 'react';
import PropTypes from 'prop-types';
import './GithubBadge.css';

const GitHubBadge = ({ username, name, link }) => {
  return (
    <div className="github-badge">
      <a href={link} target="_blank" rel="noopener noreferrer">
        <div className="github-icon">
          <img src="github-icon.png" alt="GitHub Icon" />
        </div>
        <div className="github-info">
          <span className="github-username">@{username}</span>
          <span className="github-name">{name}</span>
        </div>
      </a>
    </div>
  );
};

GitHubBadge.propTypes = {
  username: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default GitHubBadge;
