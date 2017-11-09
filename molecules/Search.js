import React from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';

@inject('store')
@observer
export default class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      players: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { players } = this.state;

    Router.push({
      pathname: '/stats',
      query: {
        players,
        region: this.props.store.region,
      },
    });
  }

  render() {
    return (
      <div className="section">
        <div className="columns is-centered">
          <div className="column is-three-quarters">
            <form onSubmit={this.handleSubmit}>
              <div className="field has-addons has-addons-centered">
                <p className="control">
                  <Input
                    className="input is-medium"
                    type="text"
                    placeholder="Summoner Name, Hero, Item..."
                    onChange={event =>
                      this.setState({ players: event.target.value })}
                  />
                </p>
                <p className="control">
                  <Select className="select is-medium">
                    <select
                      onChange={event =>
                        this.props.store.setRegion(event.target.value)}
                    >
                      <option value="na">NA</option>
                      <option value="eu">EU</option>
                      <option value="sa">SA</option>
                      <option value="ea">EA</option>
                      <option value="sg">SG</option>
                    </select>
                  </Select>
                </p>
                <p className="control">
                  <Button type="submit" className="button is-medium">
                    <span className="icon is-medium">
                      <i className="fa fa-search" />
                    </span>
                  </Button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const Button = styled.button`
  background: #f9c983;
  color: #215a7f;
  border: none;
  width: 3.5em !important;
  transition: all 333ms ease-in-out;
  &:hover {
    background: rgba(248, 200, 136, 0.7);
  }
`;

const Input = styled.input`width: 30vw !important;`;

const Select = styled.span`
  &::after {
    border: 1px solid #215a7f;
  }
`;
