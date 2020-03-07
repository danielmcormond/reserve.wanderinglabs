import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import { Divider, Button, Header, Icon, List, Tab } from "semantic-ui-react";

import DateFormat from "../utils/dateFormat";

import FilteredAvailability from "./availability";
import AvailabilityImports from "../availabilityImports";

import { fetchFacility } from "../../actions/facilitiesActions";
import { formSetFacility2, formStepInc } from "../../actions/requestFormActions";

const PANE_STYLE = {
  padding: 0,
  border: "none",
  boxShadow: "none"
};

const connected = connect(store => {
  return {
    facility: store.facilities.facility
  };
});
export class Facility extends Component {
  constructor(props) {
    super(props);
    props.dispatch(fetchFacility(props.match.params.id));
    this.state = {
      facilityId: props.match.params.id
    };
  }

  newRequest = () => {
    console.log("New Request");
    this.props.dispatch(formSetFacility2());
    this.props.dispatch(formStepInc());

    // this.props.dispatch({ type: 'FETCH_AR_FULFILLED', payload: { facility: this.props.facility }});
    this.props.dispatch(push(`/new`));
  };

  render() {
    const { facility } = this.props;

    const panes = [
      {
        menuItem: "Current Availabilities",
        render: () => (
          <Tab.Pane style={PANE_STYLE}>
            <FilteredAvailability facilityId={this.state.facilityId} />
          </Tab.Pane>
        )
      },
      {
        menuItem: "Change Log",
        render: () => (
          <Tab.Pane style={PANE_STYLE}>
            <AvailabilityImports facilityId={this.state.facilityId} />
          </Tab.Pane>
        )
      }
    ];

    return (
      <>
        <Header as="h3">
          <Icon name="map marker alternate" />
          <Header.Content>
            {facility.name}
            <Header.Subheader>{facility.sub_name}</Header.Subheader>
          </Header.Content>
        </Header>

        <Divider hidden />

        <p>
          Currently tracking <strong>{facility.sites_count}</strong> reservable items.
        </p>

        <List relaxed>
          <List.Item>
            <List.Header>Last checked at:</List.Header>
            <List.Description>
              <DateFormat format="MM/DD/YYYY hh:mm" date={facility.last_scrape_attempt} />{" "}
            </List.Description>
          </List.Item>

          <List.Item>
            <List.Header>Last change in availability:</List.Header>
            <List.Description>
              <DateFormat format="MM/DD/YYYY hh:mm" date={facility.last_import} />{" "}
            </List.Description>
          </List.Item>
        </List>
        <Button color="green" content="New Availability Request" onClick={this.newRequest} />

        <Divider hidden />

        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
      </>
    );

    //  <FilteredAvailability facilityId={this.state.facilityId} />
  }
}
export default connected(Facility);
