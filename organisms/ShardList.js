import React from "react";
import { inject, observer } from "mobx-react";

@inject("api", "styles")
@observer
export default class ShardList extends React.Component {
  componentDidMount() {
    this.props.api.fetchShards();
  }
  render() {
    return <p>{this.props.api.state}</p>;
  }
}
