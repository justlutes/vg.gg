import React from "react";
import styled from "styled-components";
import Link from "next/link";

export default ({ href, text }) => (
  <div className="column">
    <Link href={`/${href}`}>
      <FooterLink>{text}</FooterLink>
    </Link>
  </div>
);

const FooterLink = styled.span`
  color: #d1d1d1;
  text-transform: uppercase;
  cursor: pointer;
  transition: color 333ms ease-in-out;
  &:hover {
    color: #215a7f;
  }
`;
