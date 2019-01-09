import React, { Component } from "react";
import { connect } from "react-redux";
import { Form } from "react-redux-form";

import RequestFormStep1 from "./step1";
import RequestFormStep2 from "./step2";
import RequestFormStep3 from "./step3";
import RequestFormStep4 from "./step4";

import {
  formSubmit,
  matchingSiteCount
} from "../../../actions/requestFormActions";

const connected = connect(store => {
  return {
    currentStep: store.requestForm
  };
})
class RequestForm extends Component {
  handleSubmit(values) {
    this.props.dispatch(formSubmit(values));
  }
  handleChange(values) {
    this.props.dispatch(matchingSiteCount(values));
  }
  render() {
    const { currentStep } = this.props;

    return (
      <Form
        className="ui form big"
        model="availabilityRequestForm"
        onSubmit={values => this.handleSubmit(values)}
        onChange={values => this.handleChange(values)}
      >
        {currentStep === 1 && <RequestFormStep1 />}
        {currentStep === 2 && <RequestFormStep2 />}
        {currentStep === 3 && <RequestFormStep3 />}
        {currentStep === 4 && <RequestFormStep4 />}
      </Form>
    );
  }
}

export default connected(RequestForm);
