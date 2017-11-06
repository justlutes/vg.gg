import React from "react";
import { Provider } from "mobx-react";
import store from "../store";

import Layout from "../layouts/Main";
import ShardList from "../organisms/ShardList";

export default () => (
  <Provider {...store}>
    <Layout>
      <h2>Items</h2>
    </Layout>
  </Provider>
);
