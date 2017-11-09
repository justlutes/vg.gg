import React from 'react';
import styled from 'styled-components';

import EloGraph from '../atoms/EloGraph';
import InnerStatBlock from '../atoms/InnerStatBlock';

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
  <Row className="columns">
    <Block className="column is-one-third">
      <InnerStatBlock
        stats={[
          { statistic: skillTier, text: 'Skill Tier' },
          { statistic: winStreak, text: 'Win Streak' },
        ]}
      />
      <InnerStatBlock
        stats={[
          { statistic: karma, text: 'Karma' },
          { statistic: wins, text: 'Total Wins' },
          { statistic: xp, text: 'XP' },
        ]}
      />
    </Block>
    <EloGraph elo={elo} />
    <Block className="column is-one-third">
      <InnerStatBlock
        stats={[
          { statistic: elo[elo.length - 1].amount, text: 'Current Season' },
          { statistic: rankedGames, text: 'Ranked Games' },
        ]}
      />
      <InnerStatBlock
        stats={[
          { statistic: played, text: 'Games Played' },
          { statistic: gold, text: 'Gold Earned' },
          { statistic: level, text: 'Account Level' },
        ]}
      />
    </Block>
  </Row>
);

const Row = styled.div`
  align-items: center;
  background: #383838;
  padding: 15px;
  margin-top: 15px;
`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
