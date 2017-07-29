import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Header } from "semantic-ui-react";

import { fetchAvailabilityMatch } from "../actions/availabilityMatchesActions";

@connect(store => {
  return {
    availabilityMatch: store.availabilityMatches.match
  };
})
export default class MatchReserve extends Component {
  componentWillMount() {
    this.props.dispatch(
      fetchAvailabilityMatch(
        this.props.match.params.id,
        this.props.match.params.from
      )
    );
  }

  render() {
    const { availabilityMatch } = this.props;

    if (availabilityMatch.available === true) {
      // window.location.href = availabilityMatch.reserve_url;
    }
    return (
      <div>
        <Header as="h1">Reserved....</Header>
        <p>It appears this campsite no longer available.</p>

        <p>You can of course double check:</p>

        <Button
          color="green"
          content="Reserve"
          as="a"
          href={availabilityMatch.reserve_url}
        />
      </div>
    );
  }
}
