import React from 'react';
import io from 'socket.io-client';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';

import Layout from '../layouts/Main';
import PlayerStats from '../organisms/PlayerStats';

export default class Stats extends React.Component {
  static async getInitialProps() {
    const url =
      process.env.NODE_ENV !== 'production'
        ? 'http://localhost:3000/api/stats'
        : process.env.NOW_URL;
    const response = await fetch(url);
    const stats = await response.json();
    return { stats };
  }
  constructor(props) {
    super(props);

    this.state = {
      stats: props.stats,
    };
  }

  componentDidMount() {
    this.socket = io();
    this.socket.on('stats', this.handleStats);
  }

  componentWillUnmount() {
    this.socket.off('stats', this.handleStats);
    this.socket.close();
  }

  handleStats = stats => {
    this.setState(state => ({ stats: state.stats.body }));
  };

  renderChildren = () => {
    if (this.props.stats.status !== 200) {
      return (
        <div className="section">
          <div className="columns is-centered is-multiline">
            <div className="column is-half has-text-centered">
              <h1 className="has-text-white">Oops!</h1>
              <p className="has-text-grey-light">{this.state.stats.error}</p>
              <Link href="/">
                <span>Back</span>
              </Link>
            </div>
          </div>
        </div>
      );
    }
    return <PlayerStats stats={this.state.stats.body} />;
  };

  render() {
    return <Layout>{this.renderChildren()}</Layout>;
  }
}
