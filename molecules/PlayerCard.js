import React from 'react';
import styled from 'styled-components';

export default ({
  elo, name, skillTier, winStreak, wins, xp,
}) => (
  <div className="column is-half">
    <Card>
      <div>
        <Image
          src="https://www.favrify.com/wp-content/uploads/2015/01/skyline_prevview1.jpg"
          alt=""
        />
      </div>
      <UserName>
        <h1>{name}</h1>
      </UserName>
      <Stats>
        <List>
          <li>
            <p className="heading">Skill Tier</p>
            <p className="footing">{skillTier}</p>
          </li>
          <li>
            <p className="heading">Total Wins</p>
            <p className="footing">{wins}</p>
          </li>
          <li>
            <p className="heading">XP</p>
            <p className="footing">{xp}</p>
          </li>
        </List>
      </Stats>
    </Card>
  </div>
);

const Card = styled.div`
  position: relative;
  margin: 0 auto;
  width: 100%;
`;

const Image = styled.img`
height: 100%;
margin: auto;
border-radius: 10px;
display: block;
box-shadow: 0 5px 10px darken(#81B3FC, 20%);
`;

const List = styled.ul`
display: flex;
justify-content: space-around;
align-items: center;
height: 100%;
`;

const Stats = styled.div`
box-shadow: 0 5px 10px darken(#81B3FC, 20%);
background-color: white;
height: 123px;
width: 450px;
border-radius: 10px;
margin: 0 auto;
position: relative;
top: -130px;
`;

const UserName = styled.div`
font-weight: 800;
font-size: 36px;
border: 6px solid white;
color: white;
padding: 10px;
position: relative;
top: -180px;
width: 50%;
text-align: center;
margin: 0 auto;
text-transform: uppercase;
`;
