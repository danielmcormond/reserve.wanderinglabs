import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Field, reduxForm } from 'redux-form';
import { Form } from 'react-redux-form';

import { fetchAvailabilityRequests } from "../actions/availabilityRequestsActions"

import { Input } from 'semantic-ui-react'

import RequestFormStep1 from './requestFormStep1'
import RequestFormStep2 from './requestFormStep2'
import RequestFormStep3 from './requestFormStep3'
import RequestFormStep4 from './requestFormStep4'

@connect((store) => {
  return {
    currentStep: store.requestForm
  };
})


class RequestForm extends Component {

  render() {
    const { handleSubmit, load, pristine, reset, submitting, currentStep } = this.props;

    return (
      <Form model="testForm">
        { currentStep === 1 && <RequestFormStep1 /> }
        { currentStep === 2 && <RequestFormStep2 /> }
        { currentStep === 3 && <RequestFormStep3 /> }
        { currentStep === 4 && <RequestFormStep4 /> }
      </Form>
    );
  }
};

export default RequestForm;
