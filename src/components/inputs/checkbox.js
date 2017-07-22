import React, { Component } from "react";
import { Checkbox } from "semantic-ui-react";

export default class SemanticCheckbox extends Component {
  render() {
    return <Checkbox {...this.props} />;
  }
}
