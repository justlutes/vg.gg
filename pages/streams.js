import React from "react";
import { Provider } from "mobx-react";
import styled from "styled-components";
import store from "../store";

import TWITCHAPI from "../TWITCHAPI";

import Layout from "../layouts/Main";
import StreamList from "../organisms/StreamList";

const StreamPage = ({ streams }) => (
  <Provider {...store}>
    <Layout>
      <div className="section">
        <Title>Current Top Twitch Streams</Title>
        <div className="columns is-multiline">
          {streams.map(s => (
            <StreamList
              key={s.name}
              name={s.name}
              thumbnail={s.thumbnail}
              title={s.title}
              viewers={s.viewers}
              url={s.url}
            />
          ))}
        </div>
      </div>
    </Layout>
  </Provider>
);

StreamPage.getInitialProps = async ({ req }) => {
  const streams = await TWITCHAPI.getStreams();
  return { streams };
};

export default StreamPage;

const Title = styled.h1`
  color: #245b7e;
  text-transform: uppercase;
  margin-bottom: 20px;
  font-weight: 700;
`;
