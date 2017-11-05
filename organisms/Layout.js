import React from "react";
import Footer from "../atoms/Footer";
import Head from "../atoms/Head";
import Navigation from "../molecules/Navigation";

export default ({ children }) => [
  <Head key="head" />,
  <div className="container" key="layout">
    <Navigation />
    {children}
  </div>,
  <Footer key="footer" />
];
