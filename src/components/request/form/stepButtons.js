import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Divider, Icon, Grid } from "semantic-ui-react";

import { formStepInc } from "../../../actions/requestFormActions";

@connect(store => {
  return {
    currentStep: store.requestForm,
    isAuthenticated: store.session.isAuthenticated
  };
})
export default class RequestFormStepButtons extends Component {
  nextStep() {
    this.props.dispatch(formStepInc());
  }

  get lastStep() {
    return this.props.isAuthenticated ? 3 : 4;
  }

  render() {
    const { currentStep } = this.props;

    return (
      <Grid>
        <Grid.Column floated="right" mobile="16" computer="8" tablet="8">
          <Divider hidden />
          {currentStep !== this.lastStep &&
            <Button
              as="a"
              size="large"
              color="green"
              fluid
              onClick={() => this.nextStep()}
            >
              Next Step
              <Icon name="chevron right" />
            </Button>}
          {currentStep === this.lastStep &&
            <Button size="large" color="green" fluid>
              Submit Request
            </Button>}
        </Grid.Column>
      </Grid>
    );
  }
}
