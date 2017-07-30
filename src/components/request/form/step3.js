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
    value: "tent_or_rv"
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
  return {
    type: store.availabilityRequestForm.step3.type,
    electric: store.availabilityRequestForm.step3.electric
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

  render() {
    const { type, electric } = this.props;

    return (
      <Grid>
        <Grid.Column mobile="16">
          <label>Site Type</label>
          <div>
            <Dropdown
              className="big"
              fluid
              selection
              options={siteTypeOptions}
              onChange={this.handleSiteTypeClick}
              value={type}
            />
          </div>
        </Grid.Column>
        <Grid.Column mobile="8">
          <Control
            model=".step3.length"
            component={SemanticInput}
            controlProps={{
              label: "Minimum site Length:"
            }}
          />
        </Grid.Column>
        <Grid.Column mobile="8">
          <label>Electric</label>
          <div>
            <Dropdown
              className="big"
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

        <Grid.Column mobile="16">
          <label>Only Specific Sites:</label>
          <RequestFormStep3Sites />
        </Grid.Column>

        <Grid.Column computer="16" tablet="16" mobile="16">
          <RequestFormStepButtons />
        </Grid.Column>
      </Grid>
    );
  }
}
