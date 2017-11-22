import React from 'react';

import TWITCHAPI from '../TWITCHAPI';

import Layout from '../layouts/Main';
import PageTitle from '../atoms/PageTitle';
import StreamItem from '../atoms/StreamItem';

const StreamPage = ({ streams = [] }) => (
  <Layout>
    <div className="section">
      <PageTitle title="Current Vainglory Streams" />
      <div className="columns is-multiline">
        {streams.map(s => (
          <StreamItem
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
);

StreamPage.getInitialProps = async () => {
  const streams = await TWITCHAPI.getStreams();
  return { streams };
};

export default StreamPage;
