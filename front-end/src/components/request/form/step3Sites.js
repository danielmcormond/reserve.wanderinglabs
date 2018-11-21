import React, { Component } from "react";
import { connect } from "react-redux";
import { Dropdown } from "semantic-ui-react";
import { actions } from "react-redux-form";

import { fetchSites } from "../../../actions/sitesActions";

@connect(store => {
  return {
    sites: store.sites.sites,
    siteIds: store.availabilityRequestForm.step3.siteIds,
    facilityId: store.availabilityRequestForm.step1.facilityId
  };
})
export default class RequestFormStep1 extends Component {
  handleChange = (e, value) => {
    this.props.dispatch(
      actions.change("availabilityRequestForm.step3.siteIds", value.value)
    );
  };

  handleSearchChange = (e, value) => {
    this.props.dispatch(
      fetchSites(this.props.facilityId, value.searchQuery, this.props.siteIds)
    );
  };

  render() {
    const { sites, siteIds } = this.props;

    return (
      <Dropdown
        selection
        fluid
        multiple
        search
        placeholder="Enter site number or name"
        value={siteIds}
        options={sites}
        onChange={this.handleChange}
        onSearchChange={this.handleSearchChange}
      />
    );
  }
}
