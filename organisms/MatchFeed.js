import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';

import Match from '../molecules/Match';

@inject('store')
@observer
export default class MatchFeed extends React.Component {
  constructor() {
    super();

    this.state = {
      matches: [],
    };
  }

  componentWillMount() {
    const { matches } = this.state;
    const { fetchRecentMatch, fetchProMatches } = this.props.store;
    fetchRecentMatch().then(match => {
      matches.push(match[0]);
      this.setState({ matches });
    });
  }

  render() {
    return (
      <div className="section">
        <div className="columns is-centered">
          {this.state.matches.map(match => (
            <Match
              key={match.id}
              duration={match.duration}
              mode={match.gameMode}
              patch={match.patchVersion}
              player={match.matchRoster.shift().rosterParticipants.shift()}
            />
          ))}
        </div>
      </div>
    );
  }
}
