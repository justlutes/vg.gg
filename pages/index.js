import React from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';
import Router from 'next/router';
import Wade from 'wade';

import Landing from '../layouts/Landing';
import Loading from '../atoms/Loading';
import MatcheFeed from '../organisms/MatchFeed';
import Navigation from '../molecules/Navigation';
import ResultItem from '../atoms/ResultItem';
import ResultHero from '../atoms/ResultHero';
import Search from '../molecules/Search';
import { heroList, itemList } from '../helpers';

export default class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      matches: {},
      player: '',
      loading: true,
      itemResults: [],
      heroResults: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRegion = this.handleRegion.bind(this);
    this.handlePlayer = this.handlePlayer.bind(this);
  }

  componentDidMount() {
    this.itemSearch = Wade(itemList);
    this.heroSearch = Wade(heroList);
    this.socket = io();
    this.socket.emit('initial');

    this.socket.on('matches', matches =>
      this.setState({ loading: false, matches }));
  }

  componentWillUnmount() {
    this.socket.off('matches', matches =>
      this.setState({ loading: false, matches }));
    this.socket.close();
  }

  handleRegion(region) {
    this.socket.emit('region', region);
  }

  handlePlayer(query) {
    const itemResults = this.itemSearch(query);
    const heroResults = this.heroSearch(query);
    this.setState({ player: query, itemResults, heroResults });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.socket.emit('player', this.state.player);
    Router.push({
      pathname: '/stats',
      query: { player: this.state.player },
    });
    Router.onRouteChangeStart = () => this.setState({ loading: true });
  }

  render() {
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
              {this.state.itemResults.length ||
              this.state.heroResults.length ? (
                <Results>
                  <ResultsColumn>
                    <h2>Items</h2>
                    {this.state.itemResults.map(r => (
                      <ResultItem
                        key={itemList[r.index]}
                        item={itemList[r.index]}
                      />
                    ))}
                  </ResultsColumn>
                  <ResultsColumn>
                    <h2>Heroes</h2>
                    {this.state.heroResults.map(r => (
                      <ResultHero
                        key={heroList[r.index]}
                        item={heroList[r.index]}
                      />
                    ))}
                  </ResultsColumn>
                </Results>
              ) : null}
            </div>
            <div className="section">
              <Loading loading={this.state.loading} />
              {Object.keys(this.state.matches).length ? (
                <MatcheFeed
                  matches={this.state.matches.matches}
                  tournaments={this.state.matches.proMatches}
                />
              ) : null}
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

const Results = styled.div`
  display: flex;
  flex-direction: row;
  width: 60%;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.5);
  padding: 15px;
  justify-content: space-around;
`;

const ResultsColumn = styled.div`
  display: flex;
  flex-grow: 1;
  text-align: center;
  flex-direction: column;
  & > h2 {
    color: #fff;
    text-transform: uppercase;
    font-family: 'Bebas Neue', sans-serif;
    font-weight: 700;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
