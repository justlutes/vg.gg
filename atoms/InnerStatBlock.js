import React from 'react';
import styled from 'styled-components';

export default ({ stats = [] }) => (
  <Inner>
    {stats.map(stat => (
      <div key={stat.text}>
        <p>{stat.statistic}</p>
        <Stat>{stat.text}</Stat>
      </div>
    ))}
  </Inner>
);

const Inner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  margin-top: 15px;
  color: #e9e9e9;
  font-size: 14px;
`;

const Stat = styled.p`
  font-weight: 700;
  font-family: 'Bebas Neue', sans-serif !important;
  color: #6a6a6a;
  font-size: 16px;
`;
