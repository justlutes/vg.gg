import React from "react";
import styled from "styled-components";

export default ({ name, thumbnail, title, url, viewers }) => (
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
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.117647),
    0 1px 4px rgba(0, 0, 0, 0.117647);
  &:hover {
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.156863),
      0 3px 10px rgba(0, 0, 0, 0.227451);
  }
`;

const Figure = styled.figure`background: url(${props => props.thumbnail});`;

const Subtitle = styled.p`
  color: #6a6a6a;
  font-size: 12px;
`;

const Title = styled.p`
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
