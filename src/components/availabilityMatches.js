import React, { Component } from 'react';
import { connect } from "react-redux"
import { Button, Divider, Header, Icon, Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import DateFormat from './utils/dateFormat'
import { fetchAvailabilityMatches } from "../actions/availabilityMatchesActions"

@connect((store) => {
  return {
    matches: store.availabilityMatches.matches
  };
})
export default class AvailabilityMatches extends Component {

  componentWillMount() {
    this.props.dispatch(fetchAvailabilityMatches(this.props.match.params.uuid));
  }


  render() {
    const { matches } = this.props;
    const mappedArs = matches.map(ar => {
      return (
      <Table.Row key={ar.id}>
        <Table.Cell textAlign='left'>
          <Header size='tiny'>
            <Header.Content>
              <DateFormat format="MM/DD" date={ar.avail_date}/>
              <Header.Subheader>
                <DateFormat format="dddd" date={ar.avail_date}/>
              </Header.Subheader>
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
          {!!ar.available && <Button fluid color='green' content='Reserve' as={Link} to={`/w/${ar.short}`} />}
        </Table.Cell>
      </Table.Row>
      );
    });

    return (
      <div>
        <Divider hidden />
        <Header size='tiny'>
          <Icon name='calendar' />
          <Header.Content>
            Availabilities
            <Header.Subheader>
              {mappedArs.length} still available
            </Header.Subheader>
          </Header.Content>
        </Header>

        {!!!mappedArs.length && '<h3>No Requests found</h3>' }

        <Table unstackable className='availabilityMatches'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign='left'>Arrive</Table.HeaderCell>
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

