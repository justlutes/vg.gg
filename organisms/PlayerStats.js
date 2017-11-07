import React from "react";
import { inject, observer } from "mobx-react";

@inject("api", "styles")
@observer
export default class PlayerState extends React.Component {
  //   componentWillMount() {
  //     const stats = this.props.api.formatPlayers;
  //     console.log(stats);
  //   }
  render() {
    return <div><p>Stats</p></div>;
  }
}
