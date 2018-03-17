import React, { Component } from "react";
import { connect } from "react-redux";
import { Label } from "semantic-ui-react";
import { Link } from "react-router-dom";

@connect(store => {
  return {
    imports: store.availabilityImports.imports,
    fetching: store.availabilityImports.fetching,
    fetched: store.availabilityImports.fetched
  };
})
export default class AvailabilityImportsHistory extends Component {
  render() {
    const { histories, color } = this.props;

    const labelStyles = {
      color: color,
      horizontal: true,
      size: "tiny",
      style: { margin: "1px" }
    };
    const mappedHistory = histories.map((history, index) => {
      return (
        <Label key={index} {...labelStyles}>
          {history.avail_date}

          <Label.Detail>{history.site_id}</Label.Detail>
        </Label>
      );
    });

    return (
      <span>
        {mappedHistory}
      </span>
    );
  }
}
