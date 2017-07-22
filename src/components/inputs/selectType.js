import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";

export default class SelectType extends Component {
  render() {
    return (
      <Dropdown
        fluid
        selection
        {...this.props}
      />
    );
  }
}
