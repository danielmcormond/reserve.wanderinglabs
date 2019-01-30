import React, { Component } from "react";

import { Header, Icon } from "semantic-ui-react";

export default class AvailabilityMatchClickInstructionsReserveCalifornia extends Component {
  render() {
    return (
      <div>
        <Header size="medium">
          <Icon name="exclamation triangle" color="orange" />
          <Header.Content>Reserve California</Header.Content>
          <Header.Subheader>
            The new Reserve California website is not user friendly and thus we
            are unable to link directly to an open availability. The best we can
            do is a campground map. The site you are reserving should be shown
            on the map in green. Click to reserve. Then verify dates and stay
            length.
          </Header.Subheader>
        </Header>
      </div>
    );
  }
}
