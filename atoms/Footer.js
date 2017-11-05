import React from "react";
import styled from "styled-components";
import Link from "next/link";

export default () => (
  <Footer className="footer">
    <div className="columns">
      <div className="column is-half">
        <div className="columns">
          <div className="column">
            <Link href="/about">
              <FooterLink>About VG.GG</FooterLink>
            </Link>
          </div>
          <div className="column">
            <Link href="/contact">
              <FooterLink>Contact</FooterLink>
            </Link>
          </div>
          <div className="column">
            <Link href="/privacy">
              <FooterLink>Privacy Policy</FooterLink>
            </Link>
          </div>
        </div>
        <p className="is-size-6 has-text-weight-light">
          © {new Date().getFullYear()} VG.GG
        </p>
      </div>
      <div className="column is-offset-one-quarter">
        <span className="icon">
          <i className="fa fa-facebook" aria-hidden="true" />
        </span>
        <span className="icon">
          <i className="fa fa-twitter" aria-hidden="true" />
        </span>
      </div>
    </div>

  </Footer>
);

const Footer = styled.footer`
    background-color: #2E2E2E !important;
`;

const FooterLink = styled.span`
    color: #D1D1D1;
    text-transform: uppercase;
    cursor: pointer;
    transition: color 333ms ease-in-out;
    &:hover {
        color: #215A7F;
    }
`;
