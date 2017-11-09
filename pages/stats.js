import React from 'react';
import { Provider } from 'mobx-react';
import initStore from '../store';

import Layout from '../layouts/Main';
import PlayerStats from '../organisms/PlayerStats';

export default class Stats extends React.Component {
  static getInitialProps({ query, req }) {
    const isServer = !!req;
    const store = initStore(isServer);
    return { region: query.region, isServer, players: query.players };
  }
  constructor(props) {
    super(props);

    this.store = initStore(props.isServer, props.region, props.players);
  }
  render() {
    return (
      <Provider store={this.store}>
        <Layout>
          <PlayerStats
            region={this.props.region}
            players={this.props.players}
          />
        </Layout>
      </Provider>
    );
  }
}
