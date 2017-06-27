import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formStepInc, formStepDec, formStepGo } from '../actions/requestFormActions'

import { Step } from 'semantic-ui-react'


@connect((store) => {
  return {
    currentStep: store.requestForm
  };
})

export default class RequestFormSteps extends Component {

  goStep(step) {
    this.props.dispatch(formStepGo(step))
  }

  nextStep() {
    this.props.dispatch(formStepInc())
  }

  prevStep() {
    this.props.dispatch(formStepDec())
  }

  render() {
    const { currentStep } = this.props;

    return (
      <div>
        <Step.Group fluid>
          <Step active={currentStep === 1} title='Where' description='Bahia Honda' onClick={() => this.goStep(1)} />
          <Step active={currentStep === 2} title='When' description='9/21/2017 - 10/12/2017' onClick={() => this.goStep(2)} />
          <Step active={currentStep === 3} title='Options' description='30 amp' onClick={() => this.goStep(3)} />
          <Step active={currentStep === 4} title='Alerts' description='test@example.com' onClick={() => this.goStep(4)} />
        </Step.Group>

        <h2>Step: {currentStep}</h2>

        <button type="button" onClick={this.prevStep.bind(this)}>Prev Step</button>
        <button type="button" onClick={this.nextStep.bind(this)}>Next Step</button>
      </div>
    )
  };
};
