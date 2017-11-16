import React from 'react';
import io from 'socket.io-client';

import Matches from '../molecules/Matches';
import PlayerCard from '../molecules/PlayerCard';
import TitleBar from '../atoms/TitleBar';
import Loading from '../atoms/Loading';

export default class PlayerStats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      card: 'player',
      matches: [],
      players: props.stats,
      loading: false,
    };
  }
  componentWillMount() {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }
  componentDidMount() {
    this.socket = io();
    this.socket.on('player_matches', matches =>
      this.setState({ matches, loading: false, card: 'match' }));
  }

  getMatches = () => this.socket.emit('player_matches');

  renderCards = () => {
    const { matches, card, players } = this.state;
    if (matches.length && card === 'match') {
      return this.state.matches.map(match => (
        <Matches
          key={match.data.id}
          featuredId={this.state.players[0].id}
          duration={match.data.attributes.duration}
          mode={match.data.attributes.gameMode}
          patch={match.data.attributes.patchVersion}
          players={match.matchRoster}
        />
      ));
    } else if (players.length && card === 'player') {
      return this.state.players.map(player => (
        <PlayerCard key={player.name} {...player} region={this.props.region} />
      ));
    }
    return null;
  };

  render() {
    const options = [
      {
        text: 'Stats',
        callback: () => this.setState({ card: 'player' }),
      },
      {
        text: 'Matches',
        callback: () => this.getMatches(),
      },
      {
        text: 'Heroes',
        callback: () => console.log('heroes'),
      },
    ];

    if (this.state.loading) {
      return (
        <div className="section">
          <TitleBar title="Player Stats" />
          <Loading loading={this.state.loading} />
        </div>
      );
    }
    return (
      <div className="section">
        <TitleBar
          title={`Player Stats - ${this.state.players[0].name}`}
          options={options}
        />
        {this.renderCards()}
      </div>
    );
  }
}
