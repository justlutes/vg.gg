import React from 'react';
import styled from 'styled-components';

import LineChart from './LineChart';

export default ({ elo }) => (
  <Block>
    <LineChart elo={elo} />
  </Block>
);

const Block = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #6a6a6a;
  width: 30%;
  overflow: hidden;
`;
