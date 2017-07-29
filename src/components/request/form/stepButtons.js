import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Grid, Icon } from "semantic-ui-react";

import { formStepInc, formStepDec } from "../../../actions/requestFormActions";

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

  prevStep() {
    this.props.dispatch(formStepDec());
  }

  get lastStep() {
    return this.props.isAuthenticated ? 3 : 4;
  }

  render() {
    const { currentStep } = this.props;

    return (
      <Grid>
        <Grid.Column tablet="5" computer="3" mobile="7">
          {currentStep !== 1 &&
            <Button as="a" color="green" fluid onClick={() => this.prevStep()}>
              <Icon name="chevron left" />
              Previous Step
            </Button>}
        </Grid.Column>
        <Grid.Column tablet="6" computer="10" mobile="2" />
        <Grid.Column tablet="5" computer="3" mobile="7">
          {currentStep !== this.lastStep &&
            <Button as="a" color="green" fluid onClick={() => this.nextStep()}>
              Next Step
              <Icon name="chevron right" />
            </Button>}
          {currentStep === this.lastStep &&
            <Button color="green" fluid positive>
              Submit Request
            </Button>}
        </Grid.Column>
      </Grid>
    );
  }
}
