import React, { Component } from "react";
import { Grid } from "semantic-ui-react";

import RequestFormStepButtons from "./stepButtons";
import Premium from "../../user/premium.js";
import RequestFormStep1Facility from "./step1Facility.js";

export default class RequestFormStep1 extends Component {
  render() {
    return (
      <Grid>
        <Grid.Column computer="8" tablet="8" mobile="16">
          <RequestFormStep1Facility />
          <RequestFormStepButtons />
        </Grid.Column>
        <Grid.Column computer="8" tablet="8" mobile="16">
          <Premium />
        </Grid.Column>
      </Grid>
    );
  }
}
