import React from 'react';
import styled from 'styled-components';

import LineChart from './LineChart';

export default ({ elo }) => (
  <Block className="column is-one-third">
    <LineChart elo={elo} />
  </Block>
);

const Block = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  border-top: 1px solid RGBA(233, 233, 233, 0.15);
  border-bottom: 1px solid RGBA(233, 233, 233, 0.15);
  @media (min-width: 50em) {
    border: none;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 20%;
      bottom: 20%;
      width: 1px;
      background: RGBA(233, 233, 233, 0.15);
    }
    &::after {
      content: '';
      position: absolute;
      right: 0;
      top: 20%;
      bottom: 20%;
      width: 1px;
      background: RGBA(233, 233, 233, 0.15);
    }
  }
`;
