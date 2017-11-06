import React from "react";
import { Provider } from "mobx-react";
import store from "../store";
import styled from "styled-components";

import Landing from "../layouts/Landing";
import Navigation from "../molecules/Navigation";
import Search from "../molecules/Search";

export default () => (
  <Provider {...store}>
    <Landing>
      <Hero className="hero is-fullheight">
        <div className="hero-head">
          <Navigation />
        </div>
        <div className="hero-body">
          <div className="container">
            <Search />
          </div>
        </div>
      </Hero>
    </Landing>
  </Provider>
);

const Hero = styled.div`background: #245b7e;`;
