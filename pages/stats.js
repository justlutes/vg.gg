import React from "react";
import { Provider } from "mobx-react";
import store from "../store";

import Layout from "../layouts/Main";
import PlayerStats from "../organisms/PlayerStats";

export default () => (
  <Provider {...store}>
    <Layout>
      <PlayerStats />
    </Layout>
  </Provider>
);
