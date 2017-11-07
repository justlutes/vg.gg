import React from 'react';
import styled from 'styled-components';

export default ({
  elo, name, skillTier, winStreak, wins, xp,
}) => (
  <div className="column is-half">
    <div className="info-card">
      <div className="bg-img">
        <img
          src="https://www.favrify.com/wp-content/uploads/2015/01/skyline_prevview1.jpg"
          alt=""
        />
      </div>

      <div className="city-text">
        <h1>New York City</h1>
      </div>

      <div className="stats">
        <ul>
          <li>
            <p className="heading">Country</p>
            <p className="footing">USA</p>
          </li>
          <li>
            <p className="heading">Districts</p>
            <p className="footing">97</p>
          </li>
          <li>
            <p className="heading">Population</p>
            <p className="footing">18,231,987</p>
          </li>
        </ul>
        <div className="btn">Location</div>
      </div>
    </div>
    {elo} {name} {skillTier} {winStreak} {wins} {xp}
  </div>
);
