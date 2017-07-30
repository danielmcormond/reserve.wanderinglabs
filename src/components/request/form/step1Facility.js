import React, { Component } from "react";
import { connect } from "react-redux";
import { Dropdown, Grid, Header, Label } from "semantic-ui-react";
import { actions, Errors } from "react-redux-form";

import { fetchFacilities } from "../../../actions/facilitiesActions";
import { formStepValidate } from "../../../actions/requestFormActions";

import Premium from "../../user/premium.js";

@connect(store => {
  return {
    facilities: store.facilities.facilities,
    step1: store.availabilityRequestForm.step1,
    step1Valid: store.availabilityRequestForm.forms.step1.$form.valid,
    loading: store.facilities.fetching
  };
})
export default class RequestFormStep1Facility extends Component {
  handleChange = (e, value) => {
    this.props.dispatch(
      actions.change("availabilityRequestForm.step1.facilityId", value.value)
    );
    this.props.dispatch(formStepValidate()); // Get rid of errors upon selection
  };

  handleSearchChange = (e, value) => {
    this.props.dispatch(fetchFacilities(value));
  };

  render() {
    const { facilities, step1 } = this.props;
    const facilityId = step1.facilityId;

    const facilitiesOptions = facilities.map(facility => {
      return {
        key: facility.key,
        text: facility.name,
        value: facility.id,
        content: (
          <Header
            as="h5"
            content={facility.name}
            subheader={facility.sub_name}
          />
        )
      };
    });

    return (
      <div>
        <Header as="h4" content="Campground or Facility to reserve at:" />

        <Dropdown
          className="big"
          fluid
          search
          value={facilityId}
          placeholder="Search..."
          options={facilitiesOptions}
          selection
          onChange={this.handleChange}
          noResultsMessage={null}
          onSearchChange={this.handleSearchChange}
        />
        <Errors
          model="availabilityRequestForm.step1.facilityId"
          messages={{
            required: "You must select a campground"
          }}
          component={props =>
            <Label basic color="green" pointing>
              {props.children}
            </Label>}
        />
      </div>
    );
  }
}
