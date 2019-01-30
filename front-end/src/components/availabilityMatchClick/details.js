import React, { Component } from "react";
import { List } from "semantic-ui-react";

export default class AvailabilityMatchClickDetails extends Component {
  render() {
    const listItemOpts = { className: "availabilityMatchClickListItem" };
    return (
      <List size="huge">
        <List.Item {...listItemOpts}>
          <List.Header>Site:</List.Header>
          {this.props.site.site_num}
        </List.Item>

        <List.Item {...listItemOpts}>
          <List.Header>Arrival Date:</List.Header>
          {this.props.avail_date}
        </List.Item>

        <List.Item {...listItemOpts}>
          <List.Header>Number Nights:</List.Header>
          {this.props.length}
        </List.Item>
      </List>
    );
  }
}
