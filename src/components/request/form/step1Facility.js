import React, { Component } from "react";
import { connect } from "react-redux";
import { Dropdown, Header, Label } from "semantic-ui-react";
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
  handleChange = (e, value) => {
    this.props.dispatch(formSetFacility(value.value));
  };

  handleSearchChange = (e, value) => {
    this.props.dispatch(fetchFacilities(value));
  };

  render() {
    const { facilities, step1 } = this.props;
    const facilityId = step1.facilityId;

    const facilitiesOptions = facilities.map(facility => {
      return {
        key: facility.id,
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
        <label>Campground or Facility to reserve at:</label>
        <Dropdown
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
