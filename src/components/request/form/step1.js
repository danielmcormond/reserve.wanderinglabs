import React, { Component } from "react";
import { Grid } from "semantic-ui-react";

import RequestFormStepButtons from "./stepButtons";
import Premium from "../../user/premium.js";
import RequestFormStep1Facility from "./step1Facility.js";
import RequestFormStep1Table from "./step1Table.js";
export default class RequestFormStep1 extends Component {
  render() {
    return (
      <Grid padded="vertically">
        <Grid.Column computer="8" tablet="8" mobile="16">
          <RequestFormStep1Facility />
        </Grid.Column>
        <Grid.Column computer="8" tablet="8" mobile="16">
          <Premium />
        </Grid.Column>

        <Grid.Row>
          <Grid.Column computer="16" tablet="16" mobile="16">
            <RequestFormStep1Table />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
