import React from "react";
import styled from "styled-components";
import Link from "next/link";

export default ({ link, text = link }) => (
  <Item className="navbar-item">
    <Link href={`/${link}`}>
      <NavText>{text}</NavText>
    </Link>
  </Item>
);

const Item = styled.div`
    cursor: pointer;
    &:hover {
        background: #E9E9E9;
    }
`;

const NavText = styled.span`
text-transform: uppercase;
`;
