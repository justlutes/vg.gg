import React from 'react';
import styled from 'styled-components';

import Matches from '../molecules/Matches';
import TitleBar from '../atoms/TitleBar';

const options = {
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
};

export default class MatchFeed extends React.Component {
  constructor() {
    const now = new Date();
    const lastUpdate = now.toLocaleString('en-US', options);

    super();

    this.state = {
      lastUpdate,
      toggle: true,
    };
  }
  componentWillReceiveProps() {
    const now = new Date();
    const lastUpdate = now.toLocaleString('en-US', options);
    this.setState({ lastUpdate });
  }
  render() {
    const options = [
      {
        text: this.state.toggle ? 'Pro Matches' : 'Matches',
        callback: () => this.setState({ toggle: !this.state.toggle }),
      },
    ];
    return [
        <TitleBar title="Match Stream" options={options} key="title" />,
        <Wrapper key="wrapper">
            {this.state.toggle &&
              this.props.matches.map(m => (
                <Matches
                  key={m.data.id}
                  duration={m.data.attributes.duration}
                  mode={m.data.attributes.gameMode}
                  patch={m.data.attributes.patchVersion}
                  players={m.matchRoster}
                />
              ))}
            {!this.state.toggle &&
              this.props.tournaments.map(t => (
                <Matches
                  key={t.data.id}
                  duration={t.data.attributes.duration}
                  mode={t.data.attributes.gameMode}
                  patch={t.data.attributes.patchVersion}
                  players={t.matchRoster}
                />
              ))}
        </Wrapper>,
        <div className="section" key="updated">
          <TimeStamp>Last Updated - {this.state.lastUpdate}</TimeStamp>
        </div>
    ];
  }
}

const TimeStamp = styled.p`
  color: #E9E9E9;
  text-transform: uppercase;
  font-size: 14px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;
