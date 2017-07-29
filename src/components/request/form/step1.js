import React, { Component } from "react";
import { connect } from "react-redux";
import { Dropdown, Grid, Header, Label } from "semantic-ui-react";
import { actions, Errors } from "react-redux-form";

import { fetchFacilities } from "../../../actions/facilitiesActions";
import { formStepValidate } from "../../../actions/requestFormActions";

import Premium from "../../user/premium.js";
import RequestFormStep1Facility from "./step1Facility.js";

@connect(store => {
  return {};
})
export default class RequestFormStep1 extends Component {
  render() {
    return (
      <Grid>
        <Grid.Column computer="8" tablet="8" mobile="16">
          <RequestFormStep1Facility />
        </Grid.Column>
        <Grid.Column computer="8" tablet="8" mobile="16">
          <Premium />
        </Grid.Column>
      </Grid>
    );
  }
}
