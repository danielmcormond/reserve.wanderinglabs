import React, { Component } from 'react';
import { connect } from "react-redux"
import { Button, Divider, Grid, Header, Icon, List } from 'semantic-ui-react'
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
        <Divider hidden />

        <Grid>
          <Grid.Row divided>
            <Grid.Column verticalAlign='middle' tablet='8' computer='4' mobile='8'>
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

              <Button fluid color='green' content='Go Premium' positive size='tiny' as={Link} to={`/w/${ar.short}`} />

            </Grid.Column>
            <Grid.Column verticalAlign='middle' tablet='8' computer='4' mobile='8'>
              <List size='medium' relaxed>
                <List.Item>
                  <List.Header>Status</List.Header>
                  {ar.status}Active
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

              <Button fluid color='orange' content='Cancel' negative size='tiny' as={Link} to={`/w/${ar.short}`} />
            </Grid.Column>
            <Grid.Column only='computer' computer='8'>
              <Header size='large' color='green'>Premium Membership</Header>
              <p>
                Become a premium member by sending a few bucks our way and we will upgrade your request to never pause; plus we will check Reserve America for you even more frequently.
              </p>
              <p>
                Any amount will get you premium status. Send what you think this service is worth.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <AvailabilityMatches {...this.props}/>
      </div>
    );
  }
}

