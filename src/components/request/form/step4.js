import React, { Component } from "react";
import { Control } from "react-redux-form";
import { Grid } from "semantic-ui-react";

import RequestFormStepButtons from "./stepButtons";
import SemanticInput from "../../semanticInput";

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
          />
          <RequestFormStepButtons />
        </Grid.Column>
      </Grid>
    );
  }
}
