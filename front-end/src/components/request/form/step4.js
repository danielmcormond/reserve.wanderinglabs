import React, { Component } from "react";
import { connect } from "react-redux";
import { Control, Errors } from "react-redux-form";
import { Divider, Grid, Label } from "semantic-ui-react";

import RequestFormStepButtons from "./stepButtons";
import SemanticInput from "../../semanticInput";

@connect(store => {
  return {
    currentStep: store.requestForm
  };
})
export default class RequestFormStep4 extends Component {
  render() {
    return (
      <Grid padded="vertically">
        <Grid.Column computer="8" tablet="8" mobile="16">
          <Control
            model=".step4.email"
            component={SemanticInput}
            controlProps={{
              label: "Email Address"
            }}
            validators={{
              required: val => val.length
            }}
          />
          <Errors
            model="availabilityRequestForm.step4.email"
            messages={{
              required: "Enter Your Email Address"
            }}
            show="touched"
            component={props =>
              <Label basic color="green" pointing>
                {props.children}
              </Label>}
          />

          <Divider hidden />
          <RequestFormStepButtons />
        </Grid.Column>
      </Grid>
    );
  }
}
