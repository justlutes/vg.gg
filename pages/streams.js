import React from "react";
import { Provider } from "mobx-react";
import store from "../store";

import TWITCHAPI from "../TWITCHAPI";

import Layout from "../layouts/Main";
import ShardList from "../organisms/ShardList";

const StreamPage = ({ streams }) => (
  <Provider {...store}>
    <Layout>
      <h2>Streams</h2>
    </Layout>
  </Provider>
);

StreamPage.getInitialProps = async ({ req }) => {
  const streams = await TWITCHAPI.getStreams();
  return { streams };
};

export default StreamPage;
