import React from "react";
import styled from "styled-components";
import Link from "next/link";

export default ({ active, link, text = link }) => (
  <Item className="navbar-item" active={active}>
    <Link prefetch href={`/${link}`}>
      <NavText>{text}</NavText>
    </Link>
  </Item>
);

const Item = styled.div`
    cursor: pointer;
    background: ${props => (props.active ? "rgba(0, 0, 0, 0.075)" : null)};
    &:hover {
        background: rgba(0, 0, 0, 0.075);
    }
`;

const NavText = styled.span`
text-transform: uppercase;
`;
