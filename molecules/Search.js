import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

@inject("api")
@observer
export default class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      region: "na",
      query: ""
    };
  }

  render() {
    return (
      <div className="section">
        <div className="columns is-centered">
          <div className="column is-three-quarters">
            <form>
              <div className="field has-addons has-addons-centered">
                <p className="control">
                  <input
                    className="input is-medium"
                    type="text"
                    placeholder="Summoner Name, Hero, Item..."
                    onChange={event =>
                      this.setState({ query: event.target.value })}
                  />
                </p>
                <p className="control">
                  <span className="select is-medium">
                    <select
                      onChange={event =>
                        this.setState({ region: event.target.value })}
                    >
                      <option value="na">NA</option>
                      <option value="eu">EU</option>
                      <option value="sa">SA</option>
                      <option value="ea">EA</option>
                      <option value="sg">SG</option>
                    </select>
                  </span>
                </p>
                <p className="control">
                  <Button className="button is-medium">
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
    background: #F9C983;
    &:hover {
        background: rgba(249, 201, 131, 0.7);
    }
`;
