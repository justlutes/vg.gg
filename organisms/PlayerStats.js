import React from 'react';

import PlayerCard from '../molecules/PlayerCard';
import TitleBar from '../atoms/TitleBar';
import Loading from '../atoms/Loading';

export default class PlayerStats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
  render() {
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
        <TitleBar title={`Player Stats - ${this.state.players[0].name}`} />
        {this.state.players.map(player => (
          <PlayerCard
            key={player.name}
            {...player}
            region={this.props.region}
          />
        ))}
      </div>
    );
  }
}
