import React, { Component } from 'react';
import { connect } from "react-redux"
import { Divider, Grid, Header, Icon, List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import moment from 'moment';

import DateFormat from './utils/dateFormat'

import { fetchAvailabilityRequest } from "../actions/availabilityRequestsActions"
import AvailabilityMatches from './availabilityMatches'


@connect((store) => {
  return {
    ar: store.availabilityRequests.ar,
    loading: store.availabilityRequests.fetching,
  };
})
export default class Request extends Component {
  componentWillMount() {
    this.props.dispatch(fetchAvailabilityRequest(this.props.match.params.uuid))
  }


  render() {
    const { ar, loading } = this.props;

    return (
      <div>
        <Header as='h5'>
          <Icon name='marker' />
          <Header.Content>
            {ar.facility.name}
            <Header.Subheader>
              Zion National Park
            </Header.Subheader>
          </Header.Content>
        </Header>

        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column>
              <List size='medium' relaxed>
                <List.Item>
                  <List.Header>Arriving between</List.Header>
                  <DateFormat format="MM/DD" date={ar.date_start} />
                    &nbsp;to&nbsp;
                  <DateFormat format="MM/DD/YYYY" date={ar.date_end} />
                </List.Item>
                <List.Item>
                  <List.Header>Stay Length</List.Header>
                  <List.Description>{ar.stay_length} days</List.Description>
                </List.Item>

                <List.Item>
                  <List.Header>Checked Count</List.Header>
                  {ar.checked_count}
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column>
              <List size='medium' relaxed>
                <List.Item>
                  <List.Header>Status</List.Header>
                  <Header as='span' color='green'>{ar.status}Active</Header>
                </List.Item>
                <List.Item>
                  <List.Header>Checked Count</List.Header>
                  {ar.checked_count}
                </List.Item>
                <List.Item>
                  <List.Header>Last Checked</List.Header>
                  <DateFormat format="MM/DD/YYYY HH:mm" date={ar.checked_at} />
                </List.Item>

              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Divider/>

        <AvailabilityMatches {...this.props}/>
      </div>
    );
  }
}

