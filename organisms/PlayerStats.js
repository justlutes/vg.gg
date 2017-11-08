import React from 'react';
import { inject, observer } from 'mobx-react';

import PlayerCard from '../molecules/PlayerCard';
import PageTitle from '../atoms/PageTitle';
import Loading from '../atoms/Loading';

@inject('store')
@observer
export default class PlayerState extends React.Component {
  constructor() {
    super();

    this.state = {
      players: [],
    };
  }
  componentWillMount() {
    this.props.store
      .getPlayers(this.props.players, this.props.region)
      .then(() => {
        const players = this.props.store.formatPlayers;
        this.setState({ players });
      });
  }
  render() {
    if (this.state.players.length === 0) {
      return <Loading state="pending" />;
    }
    return (
      <div className="section">
        <PageTitle
          title={`Stats for ${this.props.players.replace(',', ' and')}`}
        />
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
