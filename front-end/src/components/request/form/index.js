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
    currentStep: store.requestForm.step
  };
})
class RequestForm extends Component {
  handleSubmit() {
    this.props.dispatch(formSubmit());
  }
  handleChange() {
    this.props.dispatch(matchingSiteCount());
  }
  render() {
    const { currentStep } = this.props;

    return (
      <Form
        model="availabilityRequestForm"
        onChange={() => this.handleChange()}
      >
        {currentStep === 1 && <div className="ui form big"><RequestFormStep1 /></div> }
        {currentStep === 2 && <div className="ui form big"><RequestFormStep2 /></div>}
        {currentStep === 3 && <RequestFormStep3 />}
        {currentStep === 4 && <div className="ui form big"><RequestFormStep4 /></div>}
      </Form>
    );
  }
}

export default connected(RequestForm);
