import React from 'react';
import styled from 'styled-components';

export default ({
  name, thumbnail, title, url, viewers,
}) => (
  <div className="column is-one-third">
    <a href={url} target="_blank">
      <Card className="card">
        <div className="card-image">
          <Figure className="image is-16by9" thumbnail={thumbnail} />
        </div>
        <div className="card-content">
          <Title>{title}</Title>
          <Subtitle>
            {viewers} viewers on {name}
          </Subtitle>
        </div>
      </Card>
    </a>
  </div>
);

const Card = styled.div`
  box-shadow: 0 6px 37px -6px rgba(0, 0, 0, 0.2);
  transition: 310ms ease-in-out;
  border-radius: 25px;
  padding: 50px 5% 50px 5%;
  margin: 20px 1%;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 37px -6px rgba(0, 0, 0, 0.6);
  }
`;

const Figure = styled.figure`
  background: url(${props => props.thumbnail});
  border-radius: 5px;
`;

const Subtitle = styled.p`
  color: #6a6a6a;
  font-size: 14px;
`;

const Title = styled.h2`
  font-size: 18px;
  margin-top: 15px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
