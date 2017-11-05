import React from "react";
import { Provider } from "mobx-react";
import store from "../store";

import Landing from "../organisms/Landing";
import Layout from "../organisms/Layout";
import ShardList from "../organisms/ShardList";

export default () => (
  <Provider {...store}>
    <Landing />
  </Provider>
);
