import React, { Component } from 'react';
import { connect } from "react-redux"
import { Button, Header, Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { fetchAvailabilityMatches } from "../actions/availabilityMatchesActions"

@connect((store) => {
  return {
    matches: store.availabilityMatches.matches,
    loading: store.availabilityRequests.fetching,
  };
})
export default class AvailabilityMatches extends Component {

  componentWillMount() {
    this.props.dispatch(fetchAvailabilityMatches(this.props.match.params.uuid));
  }


  render() {
    const { matches, loading } = this.props;
    const mappedArs = matches.map(ar => {
      return (
      <Table.Row key={ar.id}>
        <Table.Cell>
          <Header size='tiny'>
            <Header.Content>
              {ar.avail_date}
              <Header.Subheader>Thursday</Header.Subheader>
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell textAlign='center' collapsing>
          {ar.length}
        </Table.Cell>
        <Table.Cell textAlign='center'>
          {ar.site.site_num}
        </Table.Cell>
        <Table.Cell textAlign='right'>
          <Button fluid
            color='green'
            content='Reserve'
            as={Link}
            to={`reserve/${ar.id}`}
          />
        </Table.Cell>
      </Table.Row>
      );
    });

    return (
      <div>
        <Header as='h5'>
          Found Availabilities
        </Header>

        <Table unstackable className='availabilityMatches'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Arrival Date</Table.HeaderCell>
              <Table.HeaderCell textAlign='center' >Nights</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Site #</Table.HeaderCell>

              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {mappedArs}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

