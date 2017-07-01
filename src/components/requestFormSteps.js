import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import { connect } from 'react-redux';
import { formStepInc, formStepDec, formStepGo } from '../actions/requestFormActions'

import { Icon, Menu, Step } from 'semantic-ui-react'


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
      <div className='navPadded'>
        <Menu
          inverted
          className='StepsNavMenu mobile only'
        >
          <Menu.Item onClick={() => this.prevStep()}>
            <Icon name='chevron left'/>
          </Menu.Item>
          <Menu.Item
            name='home'
            header
          >
            Step: {currentStep}
          </Menu.Item>
          <Menu.Item position='right' onClick={() => this.nextStep()}>
            <Icon name='chevron right' />
          </Menu.Item>
        </Menu>

        <Step.Group fluid className='mobile hidden'>
          <Step active={currentStep === 1} title='Where' description='Bahia Honda' onClick={() => this.goStep(1)} />
          <Step active={currentStep === 2} title='When' description='9/21/2017 - 10/12/2017' onClick={() => this.goStep(2)} />
          <Step active={currentStep === 3} title='Options' description='30 amp' onClick={() => this.goStep(3)} />
          <Step active={currentStep === 4} title='Alerts' description='test@example.com' onClick={() => this.goStep(4)} />
        </Step.Group>
      </div>
    )
  };
};
