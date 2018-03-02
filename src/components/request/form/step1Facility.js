import React, { Component } from "react";
import { connect } from "react-redux";
import { Dropdown, Header, Input, Label } from "semantic-ui-react";
import { Errors } from "react-redux-form";

import { fetchFacilities } from "../../../actions/facilitiesActions";
import { formSetFacility } from "../../../actions/requestFormActions";

@connect(store => {
  return {
    facilities: store.facilities.facilities,
    step1: store.availabilityRequestForm.step1,
    step1Valid: store.availabilityRequestForm.forms.step1.$form.valid,
    loading: store.facilities.fetching
  };
})
export default class RequestFormStep1Facility extends Component {
  handleSearchChange = (event) => {
    this.props.dispatch(fetchFacilities(event.target.value));
  };

  render() {
    const { step1 } = this.props;
    const facilityId = step1.facilityId;

    return (
      <div>
        <label>Campground or Facility to reserve at:</label>
        <Input
          fluid

          placeholder="Search..."
          onChange={this.handleSearchChange}
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
