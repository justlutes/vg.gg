import React from "react";
import { Provider } from "mobx-react";
import store from "../store";

import Layout from "../organisms/Layout";
import ShardList from "../organisms/ShardList";

export default () => (
  <Provider {...store}>
    <Layout>
      <h2>Tornaments</h2>
    </Layout>
  </Provider>
);
