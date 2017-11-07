import React from 'react';
import styled from 'styled-components';

export default ({
  elo, name, skillTier, winStreak, wins, xp,
}) => (
  <div>
    {elo} {name} {skillTier} {winStreak} {wins} {xp}
  </div>
);
