import React, { Component } from 'react';

import { connect } from 'react-redux';
import { formStepInc, formStepDec } from '../../../actions/requestFormActions'

import { Button, Grid, Icon } from 'semantic-ui-react'


@connect((store) => {
  return {
    currentStep: store.requestForm
  };
})

export default class RequestFormStepButtons extends Component {
  nextStep() {
    this.props.dispatch(formStepInc())
  }

  prevStep() {
    this.props.dispatch(formStepDec())
  }

  render() {
    const { currentStep } = this.props;

    return (
      <Grid>
          <Grid.Column tablet='5' computer='3' mobile='7'>
            { currentStep !== 1 &&
              <Button  as='a' color='green' fluid onClick={() => this.prevStep()} >
                <Icon name='chevron left' />
                Previous Step
              </Button>
            }
          </Grid.Column>
          <Grid.Column tablet='6' computer='10' mobile='2'>

          </Grid.Column>
          <Grid.Column tablet='5' computer='3' mobile='7'>
            { currentStep !== 4 &&
              <Button  as='a' color='green' fluid onClick={() => this.nextStep()} >
                Next Step
                <Icon name='chevron right' />
              </Button>
            }
            { currentStep === 4 &&
              <Button color='green' fluid positive >
                Submit Request
              </Button>
            }
          </Grid.Column>
      </Grid>
    )
  };
};
