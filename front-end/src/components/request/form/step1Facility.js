import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Input, Label } from "semantic-ui-react";
import { Errors } from "react-redux-form";
import debounce from "debounce";

import FacilityFilter from "../../facilityFilter";

import { fetchFacilities } from "../../../actions/facilitiesActions";

const connected = connect(store => {
  return {
    facilities: store.facilities.facilities,
    step1: store.availabilityRequestForm,
    step1Valid: store.forms.availabilityRequestForm.$form.valid,
    loading: store.facilities.fetching
  };
});
export class RequestFormStep1Facility extends Component {
  state = { search: "", filter: [] };

  componentWillMount() {
    this.doFetchFacilities();
  }

  doFetchFacilities = debounce(() => {
    const { filter, search } = this.state;
    this.props.dispatch(fetchFacilities(search, filter));
  }, 400);

  handleSearchChange = event => {
    this.setState({ search: event.target.value }, () => {
      this.doFetchFacilities();
    });
  };

  toggleFilter = filter => {
    this.setState({ filter }, () => {
      this.doFetchFacilities();
    });
  };

  render() {
    const { filter } = this.state;
    const { loading } = this.props;

    return (
      <div>
        <label>Campground or Facility to reserve at:</label>
        <Input
          fluid
          loading={loading}
          icon="search"
          placeholder="Search..."
          onChange={this.handleSearchChange}
          style={{ margin: ".25em 0" }}
        />
        <Errors
          model="availabilityRequestForm.facilityId"
          messages={{
            required: "You must select a campground"
          }}
          component={props => (
            <Label basic color="green" pointing>
              {props.children}
            </Label>
          )}
        />

        <FacilityFilter filter={filter} onFilterChange={this.toggleFilter} />
      </div>
    );
  }
}
export default connected(RequestFormStep1Facility);
