import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Header } from "semantic-ui-react";
import Premium from "../user/premium.js";

export default class RequestSuccess extends Component {
  render() {
    return (
      <div>
        <Grid>
          <Grid.Column computer="8" tablet="8" mobile="16">
            <Header as="h3" color="green" content="Success!" />
            <div className="frontPageInstructions">
              <p>
                New request has been saved. We will alert you should a matching
                site become available.
              </p>
            </div>
          </Grid.Column>
          <Grid.Column computer="8" tablet="8" mobile="16">
            <Premium />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
