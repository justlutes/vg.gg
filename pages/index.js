import React from "react";
import { Provider } from "mobx-react";
import { initStore } from "../store";
import styled from "styled-components";

import Landing from "../layouts/Landing";
import Navigation from "../molecules/Navigation";
import Search from "../molecules/Search";

export default class Home extends React.Component {
  static getInitialProps({ req }) {
    const isServer = !!req;
    const store = initStore(isServer);
    return { region: store.region, isServer, player: store.player };
  }
  constructor(props) {
    super(props);
    this.store = initStore(props.isServer, props.region, props.player);
  }
  render() {
    return (
      <Provider store={this.store}>
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
  }
}

const Hero = styled.div`
  background: #304352;
  background: -webkit-linear-gradient(bottom right, #304352, #162851);
  background: -moz-linear-gradient(bottom right, #304352, #162851);
`;
