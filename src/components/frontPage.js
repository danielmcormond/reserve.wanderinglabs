import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Divider, Grid, Header, Icon } from "semantic-ui-react";
import { push } from "react-router-redux";
import { Link } from "react-router-dom";

import Premium from "./user/premium.js";

@connect(store => {
  return {
    ars: store.availabilityRequests.ars,
    loading: store.availabilityRequests.fetching
  };
})
export default class FrontPage extends Component {
  render() {
    return (
      <div>
        <Header as="h1" color="green">
          <Header.Content>
            Campground Full?
            <Header.Subheader>
              Tell us when and where you want to camp and we will let you know
              when a site becomes available.
            </Header.Subheader>
          </Header.Content>
        </Header>

        <Divider hidden />

        <Grid>
          <Grid.Column computer="8" tablet="8" mobile="16">
            <div className="frontPageInstructions">
              <p>
                For example you could request a stay at Bahia Honda State Park
                in Florida for 5 consecutive nights anytime between January 1
                and March 1.
              </p>
              <p>
                We will check the reservation website every few minutes and if a
                site becomes available we will email you.
              </p>
              <p>It will then be up to you to make the actual reservation.</p>
            </div>
            <Divider hidden />

            <Button
              fluid
              as="a"
              color="green"
              floated="right"
              size="huge"
              as={Link}
              to="new"
            >
              Make a Request
              <Icon name="chevron right" />
            </Button>
          </Grid.Column>
          <Grid.Column computer="8" tablet="8" mobile="16">
            <Premium />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
