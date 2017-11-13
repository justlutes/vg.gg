import React from 'react';
import styled from 'styled-components';

export default ({
  name, thumbnail, title, url, viewers,
}) => (
  <div className="column is-one-third">
    <a href={url} target="_blank">
      <Figure className="image is-16by9" thumbnail={thumbnail}>
        <Content>
          <Title>{title}</Title>
          <Subtitle>
            {viewers} viewers on {name}
          </Subtitle>
        </Content>
      </Figure>
    </a>
  </div>
);

const Figure = styled.figure`
  position: relative;
  background: url(${props => props.thumbnail});
  &:hover {
    &::before {
      left: -4%;
      bottom: -15%;
    }
    &::after {
      right: -9%;
      top: -2%;
    }
  }
  &::before {
    content: url(/static/leftBracket.svg);
    transition: all 222ms ease-in;
    width: 50px;
    height: 50px;
    position: absolute;
    left: -2.5%;
    bottom: -11%;
  }
  &::after {
    content: url(/static/rightBracket.svg);
    transition: all 222ms ease-in;
    width: 50px;
    height: 50px;
    position: absolute;
    right: -7%;
    top: 0;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  bottom: 0;
  width: 100%;
  opacity: 0;
  padding: 20px;
  transition: opacity 222ms ease-in-out;
  ${Figure}:hover & {
    opacity: 1;
  }
`;

const Subtitle = styled.p`
  color: #fff;
  font-size: 14px;
  margin-left: 15px;
`;

const Title = styled.h2`
  font-size: 18px;
  color: #fff;
  margin-left: 15px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
