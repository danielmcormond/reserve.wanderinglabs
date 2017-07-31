import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Header } from "semantic-ui-react";

import { fetchAvailabilityMatch } from "../actions/availabilityMatchesActions";

@connect(store => {
  return {
    availabilityMatch: store.availabilityMatches.match
  };
})
export default class availabilityMatchClick extends Component {
  componentWillMount() {
    this.props.dispatch(
      fetchAvailabilityMatch(
        this.props.match.params.id,
        this.props.match.params.from
      )
    );
  }

  loading() {
    return <Header as="h1" content="Loading..." subheader="Please wait" />;
  }

  redirecting() {
    return <Header as="h1" content="Redirecting..." subheader="Please wait" />;
  }

  reserved() {
    return (
      <Header
        as="h1"
        content="Reserved..."
        subheader="It appears this campsite no longer available. You can of course double check:"
      />
    );
  }

  reserveButton() {
    return (
      <Button
        color="green"
        content="Reserve"
        as="a"
        href={this.props.availabilityMatch.reserve_url}
      />
    );
  }

  render() {
    const { availabilityMatch } = this.props;

    if (availabilityMatch.available === true) {
      window.location.href = availabilityMatch.reserve_url;
    }
    return (
      <div>
        {availabilityMatch.id === null && this.loading()}
        {availabilityMatch.available === true && this.redirecting()}
        {availabilityMatch.available === false && this.reserved()}
        {availabilityMatch.id !== null && this.reserveButton()}
      </div>
    );
  }
}
