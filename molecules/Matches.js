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
      gold: rosterData.data.attributes.stats.gold.toFixed(1),
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

    this.setState({ player, teams });
  }
  render() {
    const { duration, patch, mode } = this.props;
    const { player, teams } = this.state;

    return (
      <Row classname="columns">
        <Hero classname="column">{player.hero}</Hero>
        <Game className="column">
          <Result result={player.result}>{player.result}</Result>
          {mode}
          {duration}
        </Game>
        <Build classname="column">
          {player.items.map(item => <span key={item}>{item}</span>)}
        </Build>
        <KDA className="column">
          <span>{player.kda}</span>
          <span>KDA</span>
        </KDA>
        <Stats className="column">
          <Stat>
            <span>{patch}</span>
            <span>Patch</span>
          </Stat>
          <Stat>
            <span>{player.cs}</span>
            <span>CS</span>
          </Stat>
          <Stat>
            <span>{player.gold}</span>
            <span>Gold</span>
          </Stat>
        </Stats>
        <div>Roster</div>
      </Row>
    );
  }
}

const Build = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: nowrap;
`;

const Hero = styled.div`
  display: flex;
  flex-direction: row;
`;

const Game = styled.div`
  display: flex;
  align-items: center;
`;

const KDA = Game.extend``;

const Result = styled.span`
  color: ${props => (props.result === 'Victory' ? 'green' : 'red')};
`;

const Row = styled.div`
  align-items: center;
  justify-content: space-around;
  background: #383838;
  padding: 15px;
  border-bottom: 1px solid RGBA(233, 233, 233, 0.15);
`;

const Stat = Game.extend``;

const Stats = Hero.extend`justify-content: space-around;`;
