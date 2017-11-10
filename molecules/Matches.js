import React from 'react';
import styled from 'styled-components';

export default class Matches extends React.Component {
  constructor() {
    super();

    this.state = {
      player: {},
      teams: [],
    };
  }

  componentWillMount() {
    const { players } = this.props;
    const singleResult = players[0];
    const playerData = singleResult.data.attributes;
    const rosterData = singleResult.rosterParticipants[0];
    const teams = [];
    const member = {};

    const player = {
      id: rosterData.data.id,
      result: playerData.won ? 'Victory' : 'Loss',
      hero: rosterData.data.attributes.actor.replace(/[^\w\s]/gi, ''),
      kda: `${rosterData.data.attributes.stats.kills}/${rosterData.data
        .attributes.stats.deaths}/${rosterData.data.attributes.stats.assists}`,
      gold: rosterData.data.attributes.stats.gold.toFixed(2),
      items: rosterData.data.attributes.stats.items,
      cs: rosterData.data.attributes.stats.minionKills,
      side: playerData.stats.side,
    };

    players.map((p, i) => {
      const team = [];
      p.rosterParticipants.map((part, index) => {
        member[index] = {
          hero: part.data.attributes.actor.replace(/[^\w\s]/gi, ''),
          name: part.participantPlayer.data.attributes.name,
        };
        team.push(member);
      });
      teams[i] = team;
    });

    console.log(player, teams);
    this.setState({ player, teams });
  }
  render() {
    const { duration, patch, mode } = this.props;
    return (
      <Row>
        <div>Hero</div>
        <div>
          Victory/Time
          {duration}
          {mode}
        </div>
        <div>KDA</div>
        <div>Stats {patch}</div>
        <div>Build</div>
        <div>Roster</div>
      </Row>
    );
  }
}

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: #383838;
  padding: 15px;
  border-bottom: 1px solid RGBA(233, 233, 233, 0.15);
`;
