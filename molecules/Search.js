import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

@inject("api")
@observer
export default class Search extends React.Component {
  render() {
    return (
      <div className="section">
        <div className="columns is-centered">
          <div className="column is-three-quarters">
            <form>
              <div className="field has-addons has-addons-centered">
                <p className="control is-large">
                  <input
                    className="input"
                    type="text"
                    placeholder="Amount of money"
                  />
                </p>
                <p className="control">
                  <span className="select">
                    <select>
                      <option>NA</option>
                      <option>EU</option>
                      <option>SA</option>
                      <option>EA</option>
                      <option>SG</option>
                    </select>
                  </span>
                </p>
                <p className="control">
                  <a className="button is-primary">
                    Transfer
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
