import React from 'react';
import styled from 'styled-components';

export default ({ stat, text }) => (
  <Stat>
    <span className="has-text-light">{stat}</span>
    <span>{text}</span>
  </Stat>
);

const Stat = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;
