import React from 'react';
import styled from 'styled-components';

export default ({
  elo, name, skillTier, winStreak, wins, xp,
}) => (
  <div className="column is-half">
    <Card>
      <Header>
        <svg viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet">
          <Path d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z" />
        </svg>
        <UserName>
          <h1>{name}</h1>
        </UserName>
      </Header>
      <Stats>
        <List>
          <ListItemLeft>
            <p>Current Season</p>
            <Stat>ELO - {elo}</Stat>
          </ListItemLeft>
          <ListItemLeft>
            <p>Winstreak</p>
            <Stat>{winStreak}</Stat>
          </ListItemLeft>
        </List>
        <List>
          <ListItem>
            <Stat>{skillTier.substring(0, skillTier.indexOf('-'))}</Stat>
            <p>Skill Tier</p>
          </ListItem>
          <ListItem>
            <Stat>{wins}</Stat>
            <p>Total Wins</p>
          </ListItem>
          <ListItem>
            <Stat>{xp}</Stat>
            <p>XP</p>
          </ListItem>
        </List>
      </Stats>
    </Card>
  </div>
);

const Card = styled.div`
  position: relative;
  display: flex;
  border-radius: 5px;
  flex-direction: column;
  width: 100%;
  height: 400px;
  box-shadow: 0 6px 37px -6px rgba(0, 0, 0, 0.2);
  background: #e6e9f0;
  background: -webkit-linear-gradient(top left, #e6e9f0, #eef1f5);
  background: -moz-linear-gradient(top left, #e6e9f0, #eef1f5);
  background: linear-gradient(top left, #e6e9f0, #eef1f5);
`;

const Header = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
  border-radius: 5px 5px 0 0;
  vertical-align: middle;
  overflow: hidden;
  display: inline-block;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  height: 100%;
  &:nth-of-type(1) {
    margin-right: 10%;
  }
`;

const ListItem = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const ListItemLeft = ListItem.extend`
  flex-direction: column;
  align-items: flex-start;
`;

const Path = styled.path`
  stroke: none;
  fill: #f9c983;
`;

const Stat = styled.p`
  font-weight: 700;
  font-family: 'Bebas Neue', sans-serif !important;
  color: #383838;
  font-size: 25px;
  margin-right: 10px;
`;

const Stats = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 65%;
  margin: 0 0 0 auto;
`;

const UserName = styled.div`
  font-size: 40px;
  color: white;
  position: absolute;
  top: 13px;
  left: 50%;

  text-align: center;
  text-transform: uppercase;
`;
