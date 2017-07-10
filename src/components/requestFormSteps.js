import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formStepInc, formStepDec, formStepGo } from '../actions/requestFormActions'
import { Container, Icon, Menu } from 'semantic-ui-react'

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

    const step_titles = [
      '_padding_',
      'Location',
      'Dates',
      'Options',
      'Notifications',
    ];

    return (
      <div>
        <Menu fixed='top' color='green' className='StepsNavMenu'>
          <Container>
            <Menu.Item onClick={() => this.prevStep()} fitted='horizontally'>
              <Icon name='chevron left'/>
            </Menu.Item>
            <Menu.Item name='home' header>
              Step {currentStep} of 4: {step_titles[currentStep]}
            </Menu.Item>
            <Menu.Item position='right' onClick={() => this.nextStep()} fitted='horizontally'>
              <Icon name='chevron right' />
            </Menu.Item>
          </Container>
        </Menu>
        <div className="NavPushed" />
      </div>
    )
  };
};


// <Step.Group fluid className='mobile hidden'>
//   <Step active={currentStep === 1} title='Where' description='Bahia Honda' onClick={() => this.goStep(1)} />
//   <Step active={currentStep === 2} title='When' description='9/21/2017 - 10/12/2017' onClick={() => this.goStep(2)} />
//   <Step active={currentStep === 3} title='Options' description='30 amp' onClick={() => this.goStep(3)} />
//   <Step active={currentStep === 4} title='Alerts' description='test@example.com' onClick={() => this.goStep(4)} />
// </Step.Group>
