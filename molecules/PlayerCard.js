import React from 'react';
import styled from 'styled-components';

import EloGraph from '../atoms/EloGraph';

export default ({
  elo,
  gold,
  karma,
  level,
  played,
  rankedGames,
  skillTier,
  winStreak,
  wins,
  xp,
}) => (
  <div className="column">
    <Row>
      <Block>
        <Inner>
          <div>
            <p>{skillTier}</p>
            <Stat>Skill Tier</Stat>
          </div>
          <div>
            <p>{winStreak}</p>
            <Stat>Winstreak</Stat>
          </div>
        </Inner>
        <Inner>
          <div>
            <p>{karma}</p>
            <Stat>Karma</Stat>
          </div>
          <div>
            <p>{wins}</p>
            <Stat>Total Wins</Stat>
          </div>
          <div>
            <p>{xp}</p>
            <Stat>XP</Stat>
          </div>
        </Inner>
      </Block>
      <EloGraph elo={elo} />
      <Block>
        <Inner>
          <div>
            <p>ELO - {elo[elo.length - 1].amount}</p>
            <Stat>Current Season</Stat>
          </div>
          <div>
            <p>{rankedGames}</p>
            <Stat>Ranked Games</Stat>
          </div>
        </Inner>
        <Inner>
          <div>
            <p>{played}</p>
            <Stat>Games Played</Stat>
          </div>
          <div>
            <p>{gold}</p>
            <Stat>Gold Earned</Stat>
          </div>
          <div>
            <p>{level}</p>
            <Stat>Account Level</Stat>
          </div>
        </Inner>
      </Block>
    </Row>
  </div>
);

const Row = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background: #383838;
  padding: 15px;
`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #6a6a6a;
  width: 32%;
  height: 195px;
  overflow: hidden;
  justify-content: space-around;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  margin-top: 15px;
  color: #e9e9e9;
  font-size: 12px;
`;

const Stat = styled.p`
  font-weight: 700;
  font-family: 'Bebas Neue', sans-serif !important;
  color: #6a6a6a;
  font-size: 14px;
`;
