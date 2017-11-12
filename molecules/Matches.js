import React from 'react';
import styled from 'styled-components';
import { Image } from 'cloudinary-react';

import Team from '../atoms/Team';

const formatTime = time => {
  if (time.length > 3) {
    return `${time.substr(0, 2)}:${time.substr(-2, 2)}`;
  }
  return `${time.substr(0, 1)}:${time.substr(-2, 2)}`;
}

export default class Matches extends React.Component {
  constructor() {
    super();

    this.state = {
      player: {},
      teams: [],
    };
  }

  componentWillMount() {
    this.setData();
  }

  setData = () => {
    const { players } = this.props;
    const singleResult = players[Math.round(Math.random())] || players[0];
    const playerData = singleResult.data.attributes;
    const rosterData = singleResult.rosterParticipants[Math.floor(Math.random() * 3) + 1] || singleResult.rosterParticipants[0];
    const teams = [];
    const member = {};

    const player = {
      id: rosterData.participantPlayer.data.id,
      result: playerData.won === 'true' ? 'Victory' : 'Loss',
      hero: rosterData.data.attributes.actor.replace(/[^\w\s]/gi, ''),
      kda: `${rosterData.data.attributes.stats.kills}/${rosterData.data
        .attributes.stats.deaths}/${rosterData.data.attributes.stats.assists}`,
      gold: rosterData.data.attributes.stats.gold.toFixed(1),
      items: rosterData.data.attributes.stats.items,
      cs: rosterData.data.attributes.stats.minionKills,
      side: playerData.stats.side.substring(playerData.stats.side.indexOf('/') + 1),
    };
    
    players.map((p, i) => {
      let member = {};
      p.rosterParticipants.map((part, index) => {
        member[index] = {
          id: part.participantPlayer.data.id,
          hero: part.data.attributes.actor.replace(/[^\w\s]/gi, ''),
          name: part.participantPlayer.data.attributes.name,
        };
      });
      teams[i] = member;
    });

    this.setState({ player, teams });
  }
  render() {
    const { duration, patch, mode } = this.props;
    const { player, teams } = this.state;

    return (
      <Row side={player.side} className="columns is-multiline">
        <Hero className="column is-2">
        <Image cloudName="kyle-lutes" publicId={`${player.hero.toLowerCase()}.png`} width="40" crop="scale"/>
        <HeroText>{player.hero}</HeroText>
        </Hero>
        <Game className="column is-1">
          <Result result={player.result}>{player.result}</Result>
          <Mode>{mode}</Mode>
          <Time>{formatTime(duration.toString())}</Time>
        </Game>
        <Build className="column is-2">
          <BuildRow>
          {player.items.map((item, i) => (
            <Image  key={`${item}${i}`} cloudName="kyle-lutes" publicId={`${item.toLowerCase().replace('\'', '').replace(/\s/g, "-")}.png`} width="25" crop="scale"/> ))}
          </BuildRow>
          <span>Build</span>
        </Build>
        <Stats className="column is-4">
        <Stat>
          <span className="has-text-light">{player.kda}</span>
          <span>KDA</span>
        </Stat>
          <Stat>
            <span className="has-text-light">{patch}</span>
            <span>Patch</span>
          </Stat>
          <Stat>
            <span className="has-text-light">{player.cs}</span>
            <span>CS</span>
          </Stat>
          <Stat>
            <span className="has-text-light">{player.gold}</span>
            <span>Gold</span>
          </Stat>
        </Stats>
        <Roster className="column is-3" teams={teams} featured={player.id}>
            {teams.map((team, i) => (
              <Team team={team} key={`roster${i}`} featured={player.id} />
            ))}
        </Roster>
      </Row>
    );
  }
}

const Build = styled.div`
  display: flex;
  flex-direction: column;
  color: #8F8F8F;
  text-transform: uppercase;
  text-align: center;
`;

const BuildRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const Hero = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const HeroText = styled.span`
color: #8F8F8F;
margin-left: 10px;
`;

const Game = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

const Mode = styled.span`
  color: #8F8F8F;
  text-transform: uppercase;
  font-size: 12px;
`;

const Time = styled.span`
  color: #8F8F8F;
`;

const Result = styled.span`
  color: ${props => (props.result === 'Victory' ? '#009624' : '#d50000')};
`;

const Roster = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Row = styled.div`
  position: relative;
  align-items: center;
  justify-content: space-around;
  background: #383838;
  padding: 15px;
  border-bottom: 1px solid RGBA(233, 233, 233, 0.15);
  &::before {
    position: absolute;
    content: '';
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: ${props => (props.side === 'blue' ? '#0d47a1' : '#d50000' )};
  }
`;

const Stat = Game.extend``;

const Stats = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  color: #8F8F8F;
  text-transform: uppercase;
  font-size: 12px;
`;
