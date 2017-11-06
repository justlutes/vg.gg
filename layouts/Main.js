import React from "react";
import Head from "next/head";
import Footer from "../atoms/Footer";
import Navigation from "../molecules/Navigation";
import Wrapper from "./Wrapper";

export default ({ children, title = "VG.GG" }) => (
  <Wrapper>
    <Head>
      <title>{title}</title>
    </Head>
    <header>
      <Navigation />
    </header>
    <main>{children}</main>
    <Footer />
  </Wrapper>
);
