import React from "react";
import styled from "styled-components";

import Footer from "../atoms/Footer";
import Head from "../atoms/Head";
import Navigation from "../molecules/Navigation";
import Search from "../molecules/Search";

export default () => [
  <Head key="head" />,
  <Hero className="hero is-fullheight" key="hero">
    <div className="hero-head">
      <Navigation />
    </div>
    <div className="hero-body">
      <div className="container">
        <Search />
      </div>
    </div>
  </Hero>,
  <Footer key="footer" />
];

const Hero = styled.div`
    background: #D1D1D1;
`;
