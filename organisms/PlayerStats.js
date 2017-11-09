import React from 'react';
import { inject, observer } from 'mobx-react';

import PlayerCard from '../molecules/PlayerCard';
import TitleBar from '../atoms/TitleBar';
import Loading from '../atoms/Loading';

@inject('store')
@observer
export default class PlayerStats extends React.Component {
  constructor() {
    super();

    this.state = {
      players: [],
      loading: false,
    };
  }
  componentWillMount() {
    this.setState({ loading: true });
    this.props.store
      .getPlayers(this.props.players, this.props.region)
      .then(() => {
        const players = this.props.store.formatPlayers;
        setTimeout(() => {
          this.setState({ loading: false });
        }, 1000);
        this.setState({ players });
      });
  }
  render() {
    if (this.state.loading) {
      return (
        <div className="section">
          <TitleBar title="Player Stats" />
          <div className="columns is-multiline is-centered">
            <Loading loading={this.state.loading} />
          </div>
        </div>
      );
    }
    return (
      <div className="section">
        <TitleBar title={`Player Stats - ${this.state.players[0].name}`} />
        <div className="columns is-multiline is-centered">
          {this.state.players.map(player => (
            <PlayerCard
              key={player.name}
              {...player}
              region={this.props.region}
            />
          ))}
        </div>
      </div>
    );
  }
}
