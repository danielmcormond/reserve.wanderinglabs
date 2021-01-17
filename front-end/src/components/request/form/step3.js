import React, { Component } from "react";
import { connect } from "react-redux";
import { actions, Control } from "react-redux-form";
import { Dropdown, Grid, Label } from "semantic-ui-react";

import RequestFormStepButtons from "./stepButtons";
import SemanticCheckbox from "../../inputs/checkbox";
import SemanticInput from "../../semanticInput";
import RequestFormStep3Sites from "./step3Sites";
import SiteType from "../edit/SiteType";
import SitesSelector from "../edit/SitesSelector";

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

const connected = connect(store => {
  return {
    type: store.availabilityRequestForm.type,
    electric: store.availabilityRequestForm.electric,
    sitePremium: store.availabilityRequestForm.sitePremium,
    matchingSiteCount: store.availabilityRequests.matchingSiteCount,
    facility: store.availabilityRequestForm.facility
  };
})
export class RequestFormStep3 extends Component {
  handleSiteTypeClick = (e, data) => {
    e.preventDefault();
    this.props.dispatch(
      actions.change("availabilityRequestForm.type", data.value)
    );
  };

  handleElectricClick = (e, data) => {
    e.preventDefault();
    this.props.dispatch(
      actions.change("availabilityRequestForm.electric", data.value)
    );
  };

  render() {
    const { facility, electric, matchingSiteCount } = this.props;

    return (
      <Grid style={{ marginTop: ".25em" }}>
        <Grid.Column mobile="16">
          <label>Site Type</label>
          <SiteType />
        </Grid.Column>

        {facility.sites_details.max_length > 0 && (
          <Grid.Column mobile="8">
            <label>Min Site Length</label>
            <Control model=".length" component={SemanticInput} />
          </Grid.Column>
        )}

        {facility.sites_details.electric && (
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
        )}

        <Grid.Column mobile="16" computer="8" tablet="8">
          <Grid>
            {facility.sites_details.water && (
              <Grid.Column width="4">
                <Control.checkbox
                  model=".water"
                  component={SemanticCheckbox}
                  controlProps={{
                    label: "Water"
                  }}
                />
              </Grid.Column>
            )}
            {facility.sites_details.sewer && (
              <Grid.Column width="4">
                <Control.checkbox
                  model=".sewer"
                  component={SemanticCheckbox}
                  controlProps={{
                    label: "Sewer"
                  }}
                />
              </Grid.Column>
            )}
            {facility.sites_details.pullthru && (
              <Grid.Column width="4">
                <Control.checkbox
                  model=".pullthru;"
                  component={SemanticCheckbox}
                  controlProps={{
                    label: "PullThru"
                  }}
                />
              </Grid.Column>
            )}
          </Grid>
        </Grid.Column>

        {(facility.sites_details.premium || facility.sites_details.ada) && (
          <Grid.Column mobile="16" computer="8" tablet="8">
            <Grid>
              {facility.sites_details.premium && (
                <Grid.Column width="8">
                  <Control.checkbox
                    model=".sitePremium"
                    component={SemanticCheckbox}
                    controlProps={{
                      label: "Only Premium Sites"
                    }}
                  />
                </Grid.Column>
              )}

              {facility.sites_details.ada && (
                <Grid.Column width="8">
                  <Control.checkbox
                    model=".ignoreAda"
                    component={SemanticCheckbox}
                    controlProps={{
                      label: "Don't include ADA Sites"
                    }}
                  />
                </Grid.Column>
              )}
            </Grid>
          </Grid.Column>
        )}

        <Grid.Column mobile="16">
          <SitesSelector/>
        </Grid.Column>

        <Grid.Row>
          <Grid.Column computer="8" tablet="8" mobile="8">
            <Label
              basic
              size="huge"
              color={matchingSiteCount > 0 ? "green" : "red"}
            >
              Matching site count:
              <Label.Detail>{matchingSiteCount}</Label.Detail>
            </Label>
          </Grid.Column>
          <Grid.Column computer="8" tablet="8" mobile="8">
            <RequestFormStepButtons disabled={matchingSiteCount === 0} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
export default connected(RequestFormStep3);
