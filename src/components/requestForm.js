import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { fetchAvailabilityRequests } from "../actions/availabilityRequestsActions"

import { Input } from 'semantic-ui-react'

import RequestFormSteps from './requestFormSteps'
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
      <form onSubmit={handleSubmit}>
        <RequestFormSteps />
        { currentStep === 1 && <RequestFormStep1 /> }
        { currentStep === 2 && <RequestFormStep2 /> }
        { currentStep === 3 && <RequestFormStep3 /> }
        { currentStep === 4 && <RequestFormStep4 /> }

      </form>
    );
  }
};



// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
RequestForm = reduxForm({
  form: 'initializeFromState', // a unique identifier for this form
})(RequestForm);

// // You have to connect() to any reducers that you wish to connect to yourself
// RequestForm = connect(
//   state => ({
//     initialValues: state.availabilityRequests.ars[0], // pull initial values from account reducer
//   }),
//   { load: fetchAvailabilityRequests }, // bind account loading action creator
// )(RequestForm);

export default RequestForm;
