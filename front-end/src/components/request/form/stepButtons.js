import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Icon } from "semantic-ui-react";

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
      <div>
        {currentStep !== this.lastStep && (
          <Button
            as="a"
            size="large"
            color="green"
            fluid
            onClick={() => this.nextStep()}
            disabled={this.props.disabled}
          >
            Next Step
            <Icon name="chevron right" />
          </Button>
        )}
        {currentStep === this.lastStep && (
          <Button
            size="large"
            color="green"
            fluid
            disabled={this.props.disabled}
          >
            Submit Request
          </Button>
        )}
      </div>
    );
  }
}
