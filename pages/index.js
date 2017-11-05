import React from "react";
import { Provider } from "mobx-react";
import store from "../store";

import Head from "../atoms/Head";
import Navigation from "../molecules/Navigation";
import ShardList from "../organisms/ShardList";

export default class Home extends React.Component {
  render() {
    return (
      <Provider {...store}>
        <div className="container">
          <Head />
          <Navigation />
          <h2>Testing</h2>
          <ShardList />
        </div>
      </Provider>
    );
  }
}
