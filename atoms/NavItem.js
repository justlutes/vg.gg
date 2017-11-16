import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

export default ({ active, link, text = link }) => (
  <Item className="navbar-item" active={active}>
    <Link prefetch href={`/${link}`}>
      <NavText>{text}</NavText>
    </Link>
  </Item>
);

const Item = styled.div`
  cursor: pointer;
  border-bottom: ${props =>
    (props.active ? '4px solid #F9C983' : '4px solid transparent')};
  &:hover {
    background: rgba(0, 0, 0, 0.075);
  }
`;

const NavText = styled.span`
  font-family: 'Bebas Neue', sans-serif;
  font-weight: 700;
  font-size: 20px;
  text-transform: uppercase;
  color: #2e2e2e;
  @media (min-width: 50em) {
    color: #fff;
  }
`;
