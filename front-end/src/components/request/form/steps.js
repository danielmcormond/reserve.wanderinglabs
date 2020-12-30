import React, { Component } from "react";
import { connect } from "react-redux";
import { formStepInc, formStepDec } from "../../../actions/requestFormActions";
import { Icon, Header } from "semantic-ui-react";

const connected = connect(store => {
  return {
    currentStep: store.requestForm.step,
    isAuthenticated: store.session.isAuthenticated,
    availabilityRequestForm: store.availabilityRequestForm,
  };
})
export class RequestFormSteps extends Component {
  nextStep() {
    this.props.dispatch(formStepInc());
  }

  prevStep() {
    this.props.dispatch(formStepDec());
  }

  get lastStep() {
    return this.props.isAuthenticated ? 3 : 4;
  }

  render() {
    const { currentStep, availabilityRequestForm: { facility } } = this.props;

    const step_titles = [
      "_padding_",
      "Location",
      "Dates",
      "Options",
      "Notifications"
    ];

    return (
      <div>
        <Header as="h4">
          <Header.Content>
            <Icon
              link
              disabled={currentStep === 1}
              onClick={() => this.prevStep()}
              name="chevron left"
            />
            Step {currentStep} of {this.lastStep}: {step_titles[currentStep]}
            <Header.Subheader style={{paddingLeft: "2em"}}>{facility.name}</Header.Subheader>
          </Header.Content>
        </Header>
      </div>
    );
  }
}
export default connected(RequestFormSteps);
// <Step.Group fluid className='mobile hidden'>
//   <Step active={currentStep === 1} title='Where' description='Bahia Honda' onClick={() => this.goStep(1)} />
//   <Step active={currentStep === 2} title='When' description='9/21/2017 - 10/12/2017' onClick={() => this.goStep(2)} />
//   <Step active={currentStep === 3} title='Options' description='30 amp' onClick={() => this.goStep(3)} />
//   <Step active={currentStep === 4} title='Alerts' description='test@example.com' onClick={() => this.goStep(4)} />
// </Step.Group>
