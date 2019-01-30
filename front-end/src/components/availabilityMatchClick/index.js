import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Grid, Header, Icon, Divider } from "semantic-ui-react";

import { fetchAvailabilityMatch } from "../../actions/availabilityMatchesActions";
import { AvailabilityMatchClickDetails } from "./details";
import { AvailabilityMatchClickInstructions } from "./instructions/index";

const connected = connect(store => {
  return {
    availabilityMatch: store.availabilityMatches.match
  };
});
export class availabilityMatchClick extends Component {
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
    return (
      <Header as="h1" content="Opening new tab/window..." subheader="..." />
    );
  }

  reserved() {
    return (
      <Header size="large">
        <Icon name="exclamation triangle" color="orange" />
        <Header.Content>Reserved...</Header.Content>
        <Header.Subheader>
          It appears this campsite no longer available. You can of course double
          check:
        </Header.Subheader>
      </Header>
    );
  }

  reserveHeader() {
    const { availabilityMatch } = this.props;
    return (
      <Header size="large" dividing>
        <Header.Content>{availabilityMatch.facility}</Header.Content>
      </Header>
    );
  }

  reserveDetails() {
    const { availabilityMatch } = this.props;
    return <AvailabilityMatchClickDetails {...availabilityMatch} />;
  }

  reservedButton() {
    const { availabilityMatch } = this.props;
    if (availabilityMatch.available === true) {
      // window.open(availabilityMatch.reserve.site_url, "");
    }
    return (
      <Button
        color="green"
        content="Reserve it.... "
        as="a"
        href={availabilityMatch.reserve.site_url}
        size="big"
        fluid
      />
    );
  }

  reservedInstructions() {
    const { availabilityMatch } = this.props;
    return <AvailabilityMatchClickInstructions {...availabilityMatch} />;
  }

  render() {
    const { availabilityMatch } = this.props;
    return (
      <Grid>
        <Grid.Column computer="8" tablet="8" mobile="16">
          {availabilityMatch.id === null && this.loading()}
          {availabilityMatch.id !== null && this.reserveHeader()}
          {availabilityMatch.id !== null && this.reserveDetails()}
          {availabilityMatch.available === false && this.reserved()}
          {availabilityMatch.id !== null && this.reservedButton()}
          <Divider hidden />
          {availabilityMatch.id !== null && this.reservedInstructions()}
        </Grid.Column>
      </Grid>
    );
  }
}
export default connected(availabilityMatchClick);
