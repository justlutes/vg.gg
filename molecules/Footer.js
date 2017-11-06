import React from "react";
import styled from "styled-components";
import Link from "next/link";

import FooterLink from "../atoms/FooterLink";

const FooterSocial = ({ href, icon }) => (
  <div className="column">
    <span className="icon">
      <a href={href} target="_blank">
        <Icon className={`fa fa-${icon}`} aria-hidden="true" />
      </a>
    </span>
  </div>
);

export default () => (
  <Footer className="footer">
    <div className="columns">
      <div className="column is-half">
        <div className="columns">
          <FooterLink href="about" text="About vg.gg" />
          <FooterLink href="contact" text="Contact Us" />
          <FooterLink href="privacy" text="Privacy Policy" />
        </div>
        <p className="is-size-6 has-text-weight-light">
          © {new Date().getFullYear()} VG.GG
        </p>
      </div>
      <FooterSocial />
      <div className="column is-offset-one-quarter">
        <div className="columns">
          <FooterSocial icon="facebook" />
          <FooterSocial icon="twitter" />
          <FooterSocial icon="envelope" />
        </div>
      </div>
    </div>
  </Footer>
);

const Footer = styled.footer`background-color: #2e2e2e !important;`;

const Icon = styled.i`
  color: #e9e9e9;
  transition: color 333ms ease-in-out;
  &:hover {
    color: #245b7e;
  }
`;
