import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Icon } from "semantic-ui-react";

import { formStepInc } from "../../../actions/requestFormActions";

const connected = connect(store => {
  return {
    currentStep: store.requestForm.step,
    submitting: store.requestForm.submitting,
    isAuthenticated: store.session.isAuthenticated
  };
});
export class RequestFormStepButtons extends Component {
  nextStep() {
    this.props.dispatch(formStepInc());
  }

  get lastStep() {
    return this.props.isAuthenticated ? 3 : 4;
  }

  render() {
    const { currentStep, submitting } = this.props;

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
            disabled={this.props.disabled || submitting}
            loading={submitting}
          >
            Submit Request
          </Button>
        )}
      </div>
    );
  }
}
export default connected(RequestFormStepButtons);
