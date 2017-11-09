import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';

@inject('store')
@observer
export default class MatchFeed extends React.Component {
  constructor() {
    super();

    this.state = {
      matches: [],
      proMatches: [],
    };
  }

  componentWillMount() {
    const { fetchMatches, fetchProMatches } = this.props.store;
    fetchMatches().then(() => fetchProMatches());
  }

  render() {
    return (
      <div className="section">
        <div className="columns">
          <div className="column">
            1
          </div>
          <div className="column">
            2
          </div>
        </div>
      </div>
    );
  }
}
