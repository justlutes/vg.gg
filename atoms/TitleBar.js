import React from 'react';
import styled from 'styled-components';

export default ({ title, options = [] }) => (
  <Wrapper className="columns">
    <Title className="column is-9">{title}</Title>
    <Options className={`column is-3 is-offset-${2 - options.length}`}>
      {options.map(o => (
        <Option key={o.text} onClick={() => o.callback()}>
          {o.text}
        </Option>
      ))}
    </Options>
  </Wrapper>
);

const Option = styled.li`
  background: rgba(0, 0, 0, 0.15);
  cursor: pointer;
  padding: 2px 14px;
  margin: 8px 3px;
  border-radius: 14px;
  font-size: 12px;
  color: #fff;
  transition: all 333ms ease-in-out;
  &:hover {
    background: rgba(0, 0, 0, 0.25);
    color: #245b7e;
  }
`;

const Options = styled.ul`
  list-style: none;
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  color: #6a6a6a;
  text-transform: uppercase;
  font-size: 25px;
  font-weight: 700;
`;

const Wrapper = styled.div`
  align-items: center;
  background: #f9c983;
  border-radius: 5px;
`;
