import React from 'react';
import io from 'socket.io-client';
import fetch from 'isomorphic-unfetch';
import styled from 'styled-components';
import Router from 'next/router';

import Landing from '../layouts/Landing';
import Loading from '../atoms/Loading';
import MatcheFeed from '../organisms/MatchFeed';
import Navigation from '../molecules/Navigation';
import Search from '../molecules/Search';

export default class Home extends React.Component {
  static async getInitialProps() {
    const response = await fetch('http://localhost:3000/api/matches');
    const matches = await response.json();
    return { matches };
  }
  constructor(props) {
    super(props);

    this.state = {
      matches: props.matches,
      player: '',
      loading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRegion = this.handleRegion.bind(this);
    this.handlePlayer = this.handlePlayer.bind(this);
    this.updateMatches = this.updateMatches.bind(this);
  }

  componentDidMount() {
    this.socket = io();
    this.socket.on('newMatches', this.updateMatches);
  }

  componentWillUnmount() {
    this.socket.off('newMatches', this.updateMatches);
    this.socket.close();
  }

  updateMatches(matches) {
    console.log('updated', matches);
    this.setState(state => ({ matches: state.matches }));
  }

  handleRegion(region) {
    this.socket.emit('region', region);
  }

  handlePlayer(player) {
    this.setState({ player });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.socket.emit('player', this.state.player);
    Router.push({
      pathname: '/stats',
    });
    Router.onRouteChangeStart = () => this.setState({ loading: true });
  }

  render() {
    if (this.state.loading) {
      return <Loading loading />;
    }
    return (
      <Landing>
        <Navigation />
        <Hero className="container">
            <Wrapper>
              <div className="section">
                <Search
                  handlePlayer={this.handlePlayer}
                  handleRegion={this.handleRegion}
                  handleSubmit={this.handleSubmit}
                />
              </div>
              <div className="section">
                <MatcheFeed
                  matches={this.state.matches.matches}
                  tournaments={this.state.matches.proMatches}
                />
              </div>
            </Wrapper>
        </Hero>
      </Landing>
    );
  }
}

const Hero = styled.div`
  background: #304352;
  background: -webkit-linear-gradient(bottom right, #304352, #162851);
  background: -moz-linear-gradient(bottom right, #304352, #162851);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
