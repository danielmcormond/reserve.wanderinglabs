import React, { Component } from 'react';
import { connect } from "react-redux"
import { Label, List } from 'semantic-ui-react'

import DateFormat from './utils/dateFormat'
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
          <Label circular color={ar.matches_availabile_count > 0 ? 'green' : 'gray'} size='large'>
            {ar.matches_availabile_count}
          </Label>
        </List.Content>
        <List.Content>
          <List.Header>{ar.facility.name}</List.Header>
          <DateFormat format="MM/DD" date={ar.date_start} />
            &nbsp;to&nbsp;
          <DateFormat format="MM/DD/YYYY" date={ar.date_end} />
        </List.Content>
      </List.Item>
    );

    return (
      <div>
        <List selection divided size='large' relaxed='very'>
          {mappedArs}
        </List>
        {!!!mappedArs.length && '<h3>No Requests found</h3>' }
      </div>
    );
  }
}

