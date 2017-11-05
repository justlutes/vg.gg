import React from "react";
import { inject, observer } from "mobx-react";

import Loading from "../atoms/Loading";

@inject("api", "styles")
@observer
export default class ShardList extends React.Component {
  componentDidMount() {
    this.props.api.fetchShards();
  }
  render() {
    return <Loading state={this.props.api.state} />;
  }
}
