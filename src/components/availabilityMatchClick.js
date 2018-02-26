import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Header, Icon } from "semantic-ui-react";

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
      <div>
        <Header size="large">
          <Header.Content>
            {availabilityMatch.facility}
          </Header.Content>
          <Header.Subheader>
            Site: {availabilityMatch.site.site_num} Arrival Date:{" "}
            {availabilityMatch.avail_date} Number Nights:{" "}
            {availabilityMatch.length}{" "}
          </Header.Subheader>
        </Header>
      </div>
    );
  }

  rArg() {
    const { availabilityMatch } = this.props;
    if (availabilityMatch.facility_type === "Facility::ReserveCalifornia") {
      return;
    }

    if (availabilityMatch.available === true) {
      window.open(availabilityMatch.reserve.site_url, "");
    }
    return (
      <div>
        <Button
          color="green"
          content="Reserve it.... "
          as="a"
          href={availabilityMatch.reserve.site_url}
        />
      </div>
    );
  }

  reserveCalifornia() {
    const { availabilityMatch } = this.props;
    if (availabilityMatch.facility_type !== "Facility::ReserveCalifornia") {
      return;
    }
    return (
      <div>
        <br />
        <Header size="medium">
          <Icon name="exclamation triangle" color="orange" />
          <Header.Content>Reserve California</Header.Content>
          <Header.Subheader>
            The new Reserve California website is not user friendly and thus we
            are unable to link directly to an open availability. The best we can do is a campground map.
            The site you are reserving should be shown on the map in green. Click to reserve. Then verify dates and stay length.
          </Header.Subheader>
        </Header>
        <Button
          color="green"
          content="Reserve Page"
          as="a"
          href={availabilityMatch.reserve.site_url}
          target="reserveCalifornia"
        />
      </div>
    );
  }

  render() {
    const { availabilityMatch } = this.props;
    return (
      <div>
        {availabilityMatch.id !== null && this.reserveHeader()}
        {availabilityMatch.id === null && this.loading()}
        {availabilityMatch.available === false && this.reserved()}

        {availabilityMatch.id !== null && this.reserveCalifornia()}
        {availabilityMatch.id !== null && this.rArg()}
      </div>
    );
  }
}

//         {availabilityMatch.available === true && this.redirecting()}

// <Header
//   as="h4"
//   content="Step 1: Open an active visitor session"
//   subheader="Reserve California needs to track you. Opening their homepage is enough."
// />

// <Button
//   color="green"
//   content="Open Reserve California home page"
//   as="a"
//   href={availabilityMatch.reserve.default_url}
//   target="reserveCalifornia"
// />

// <Header
//   as="h4"
//   content="Step 2: Set location, date and number of nights"
//   subheader="Tell Reserve California when and where you want to stay"
// />

// <form
//   method="post"
//   action={availabilityMatch.reserve.default_url}
//   target="reserveCalifornia"
// >
//   {mappedPost}
//   <Button color="green" content="Search" />
// </form>

// <Header
//   as="h4"
//   content="Step 3: Reservation Page"
//   subheader="Use the page from step 2 to find the open site OR use the button below to view a site specific page. This page is normally used as a popup on Reserve California. Calling it directly removes all styling and make it rather unappealing and confusing. Clicking the 'Reserve Unit' button near the top _should_ add the correct reservation to the shopping cart. Please double check!"
// />

// <Button
//   color="green"
//   content="Site Specific Reservation Page - (Warning: Unstyled)"
//   as="a"
//   href={availabilityMatch.reserve.site_url}
//   target="reserveCalifornia"
// />
