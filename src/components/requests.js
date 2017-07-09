import React, { Component } from 'react';
import { connect } from "react-redux"
import { Label, List } from 'semantic-ui-react'

import { fetchAvailabilityRequests } from "../actions/availabilityRequestsActions"
import { history } from '../utils/history';


@connect((store) => {
  return {
    ars: store.availabilityRequests.ars,
    loading: store.availabilityRequests.fetching,
  };
})
export default class Requests extends Component {

  componentWillMount() {
    this.props.dispatch(fetchAvailabilityRequests())
  }

  fetchAvailabilityRequests() {
    this.props.dispatch(fetchAvailabilityRequests())
  }

  clickedItem(uuid) {
    history.replace(`/${uuid}`);
  }

  render() {
    const { ars, loading } = this.props;
    const mappedArs = ars.map(ar =>
      <List.Item key={ar.uuid} onClick={() => this.clickedItem(ar.uuid)} >
        <List.Content floated='right'>
          <Label circular color='green' key='green' size='large'>2</Label>
        </List.Content>
        <List.Content>
          <List.Header>{ar.facility.name}</List.Header>
          {ar.date_start}
        </List.Content>
      </List.Item>
    );

    return (
      <div>
        <List selection divided size='large' relaxed='very'>
          {mappedArs}
        </List>
      </div>
    );
  }
}

