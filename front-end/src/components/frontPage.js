import React, { Component } from "react";
import { Button, Divider, Grid, Header, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

import Premium from "./user/premium.js";

export default class FrontPage extends Component {
  render() {
    return (
      <Grid>
        <Grid.Column computer="8" tablet="8" mobile="16">
          <Header as="h1" color="green">
            <Header.Content>
              Campground Full?
              <Header.Subheader style={{ fontWeight: "bold" }}>
                Tell us where you want to camp, select a date range, and receive
                a notification when a site becomes available.
              </Header.Subheader>
            </Header.Content>
          </Header>
          <Divider hidden />

          <div className="frontPageInstructions">
            <p>
              For example, submit a request to stay at Bahia Honda State Park in
              Florida for 5 consecutive nights anytime between January 1 and
              March 1. We will check the reservation website every few minutes
              and if a site becomes available you will receive an email.
            </p>
            <p>
              Finish the process by clicking the reserve link in the email and
              making the reservation.{" "}
            </p>
          </div>
          <Divider hidden />

          <Button
            fluid
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
    );
  }
}
