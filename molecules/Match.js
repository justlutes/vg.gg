import React from 'react';
import styled from 'styled-components';

export default ({
  duration, mode, patch, player,
}) => (
  <div className="column is-three-quarters">
    {duration} {mode} {patch}
  </div>
);
