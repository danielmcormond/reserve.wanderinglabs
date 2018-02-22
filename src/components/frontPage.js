import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Divider, Grid, Header, Icon } from "semantic-ui-react";
import { push } from "react-router-redux";

import Premium from "./user/premium.js";
import RequestFormStep1Facility from "./request/form/step1Facility.js";
import { formStepInc } from "../actions/requestFormActions";

@connect(store => {
  return {
    ars: store.availabilityRequests.ars,
    loading: store.availabilityRequests.fetching
  };
})
export default class FrontPage extends Component {
  componentWillMount() {
    // this.props.dispatch(fetchAvailabilityRequests());
  }

  nextStep() {
    this.props.dispatch(formStepInc());
    this.props.dispatch(push("/new"));
  }

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
          <Grid.Column computer="16" tablet="16" mobile="16">
            <div className="ui big form">
              <div className="field">
                <RequestFormStep1Facility />
              </div>

              <Button
                as="a"
                color="green"
                floated="right"
                onClick={() => this.nextStep()}
              >
                Next Step
                <Icon name="chevron right" />
              </Button>
            </div>
          </Grid.Column>
        </Grid>
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
          </Grid.Column>
          <Grid.Column computer="8" tablet="8" mobile="16">
            <Premium />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
