import React, { Component } from "react";
import { connect } from "react-redux";
import { actions, Control } from "react-redux-form";
import { Dropdown, Grid } from "semantic-ui-react";

import RequestFormStepButtons from "./stepButtons";
import SemanticCheckbox from "../../inputs/checkbox";
import SemanticInput from "../../semanticInput";
import RequestFormStep3Sites from "./step3Sites";

const siteTypeOptions = [
  {
    text: "RV Sites",
    description: "Only sites suitable for RV's",
    value: "rv"
  },
  {
    text: "Tent or RV Sites",
    description: "You can tent in an RV site",
    value: "rv_tent"
  },
  {
    text: "Tent Only Sites",
    description: "No RV's",
    value: "tent"
  },
  {
    text: "Group Sites",
    description: "You and your friends",
    value: "group"
  },
  {
    text: "Other",
    description: "Cabins, Day Use, etc",
    value: "other"
  }
];

const electricOptions = [
  {
    text: "No preference",
    value: ""
  },
  {
    text: "15 amps or more",
    value: "15"
  },
  {
    text: "20 amps or more",
    value: "20"
  },
  {
    text: "30 amps or more",
    value: "30"
  },
  {
    text: "50 amp service",
    value: "50"
  }
];

@connect(store => {
  const isReserveCalifornia =
    store.availabilityRequestForm.step1.facility.type ===
    "Facility::ReserveCalifornia";
  return {
    type: store.availabilityRequestForm.step3.type,
    electric: store.availabilityRequestForm.step3.electric,
    sitePremium: store.availabilityRequestForm.step3.sitePremium,
    isReserveCalifornia: isReserveCalifornia,
    matchingSiteCount: store.availabilityRequests.matchingSiteCount
  };
})
export default class RequestFormStep3 extends Component {
  handleSiteTypeClick = (e, data) => {
    e.preventDefault();
    this.props.dispatch(
      actions.change("availabilityRequestForm.step3.type", data.value)
    );
  };

  handleElectricClick = (e, data) => {
    e.preventDefault();
    this.props.dispatch(
      actions.change("availabilityRequestForm.step3.electric", data.value)
    );
  };

  reserveCalifornia() {
    return (
      <Grid.Column mobile="16" computer="8" tablet="8">
        <Grid>
          <Grid.Column width="8">
            <Control.checkbox
              model=".step3.sitePremium"
              component={SemanticCheckbox}
              controlProps={{
                label: "Only Premium Sites"
              }}
            />
          </Grid.Column>

          <Grid.Column width="8">
            <Control.checkbox
              model=".step3.ignoreAda"
              component={SemanticCheckbox}
              controlProps={{
                label: "Don't include ADA Sites"
              }}
            />
          </Grid.Column>
        </Grid>
      </Grid.Column>
    );
  }
  render() {
    const {
      type,
      electric,
      isReserveCalifornia,
      matchingSiteCount
    } = this.props;

    return (
      <Grid style={{ marginTop: ".25em" }}>
        <Grid.Column mobile="16">
          <label>Site Type</label>
          <div>
            <Dropdown
              fluid
              selection
              options={siteTypeOptions}
              onChange={this.handleSiteTypeClick}
              value={type}
            />
          </div>
        </Grid.Column>
        <Grid.Column mobile="8">
          <label>Min Site Length</label>
          <Control model=".step3.length" component={SemanticInput} />
        </Grid.Column>
        <Grid.Column mobile="8">
          <label>Electric</label>
          <div>
            <Dropdown
              fluid
              selection
              options={electricOptions}
              onChange={this.handleElectricClick}
              value={electric}
            />
          </div>
        </Grid.Column>

        <Grid.Column mobile="16" computer="8" tablet="8">
          <Grid>
            <Grid.Column width="4">
              <Control.checkbox
                model=".step3.water"
                component={SemanticCheckbox}
                controlProps={{
                  label: "Water"
                }}
              />
            </Grid.Column>
            <Grid.Column width="4">
              <Control.checkbox
                model=".step3.sewer"
                component={SemanticCheckbox}
                controlProps={{
                  label: "Sewer"
                }}
              />
            </Grid.Column>
            <Grid.Column width="4">
              <Control.checkbox
                model=".step3.pullthru;"
                component={SemanticCheckbox}
                controlProps={{
                  label: "PullThru"
                }}
              />
            </Grid.Column>
          </Grid>
        </Grid.Column>

        {isReserveCalifornia && this.reserveCalifornia()}

        <Grid.Column mobile="16">
          <label>Only Specific Sites:</label>
          <RequestFormStep3Sites />
        </Grid.Column>

        <Grid.Row>
          <Grid.Column computer="8" tablet="8" mobile="8">
            <p>
              Matching site count: {matchingSiteCount}
            </p>
          </Grid.Column>
          <Grid.Column computer="8" tablet="8" mobile="8">
            <RequestFormStepButtons />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
