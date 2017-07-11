import React, { Component } from 'react';

import { connect } from 'react-redux';
import { formStepInc, formStepDec, formStepGo } from '../../../actions/requestFormActions'

import { Button, Grid, Icon } from 'semantic-ui-react'


@connect((store) => {
  return {
    currentStep: store.requestForm
  };
})

export default class RequestFormStepButtons extends Component {

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
    return (
      <Grid>
          <Grid.Column tablet='5' computer='3' mobile='7'>
            <Button color='green' fluid onClick={() => this.prevStep()} >
              <Icon name='chevron left' />
              Previous Step
            </Button>
          </Grid.Column>
          <Grid.Column tablet='6' computer='10' mobile='2'>

          </Grid.Column>
          <Grid.Column tablet='5' computer='3' mobile='7'>
            <Button color='green' fluid onClick={() => this.nextStep()} >
              Next Step
              <Icon name='chevron right' />
            </Button>
          </Grid.Column>
      </Grid>
    )
  };
};
