import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Divider, Icon } from "semantic-ui-react";

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
        <Divider hidden />
        {currentStep !== this.lastStep &&
          <Button
            as="a"
            color="green"
            floated="right"
            onClick={() => this.nextStep()}
          >
            Next Step
            <Icon name="chevron right" />
          </Button>}
        {currentStep === this.lastStep &&
          <Button color="green" floated="right">
            Submit Request
          </Button>}
      </div>
    );
  }
}
