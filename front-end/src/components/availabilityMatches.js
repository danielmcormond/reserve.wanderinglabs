import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Divider,
  Header,
  Icon,
  Loader,
  Table
} from "semantic-ui-react";
import { Link } from "react-router-dom";

import DateFormat from "./utils/dateFormat";
import { fetchAvailabilityMatches } from "../actions/availabilityMatchesActions";

const connected = connect(store => {
  return {
    matches: store.availabilityMatches.matches,
    fetching: store.availabilityMatches.fetching
  };
})
export class AvailabilityMatches extends Component {
  componentWillMount() {
    this.props.dispatch(fetchAvailabilityMatches(this.props.match.params.uuid));
  }

  render() {
    const { matches, fetching } = this.props;
    const mappedArs = matches.map(ar => {
      return (
        <Table.Row key={ar.id}>
          <Table.Cell textAlign="left">
            <Header size="tiny">
              <Header.Content>
                <DateFormat format="MM/DD" date={ar.avail_date} />
                <Header.Subheader>
                  <DateFormat format="dddd" date={ar.avail_date} />
                </Header.Subheader>
              </Header.Content>
            </Header>
          </Table.Cell>
          <Table.Cell textAlign="center" collapsing>
            <Header size="tiny" content={ar.length} />
          </Table.Cell>
          <Table.Cell textAlign="center">
            <Header size="tiny">
              <Header.Content>
                {ar.site.site_num}
                <Header.Subheader>
                  {ar.site.site_type2}
                </Header.Subheader>
              </Header.Content>
            </Header>
          </Table.Cell>
          <Table.Cell textAlign="right">
            {!!ar.available &&
              <Button
                fluid
                color="green"
                content="Reserve"
                as={Link}
                to={`/w/${ar.short}`}
              />}
          </Table.Cell>
        </Table.Row>
      );
    });

    return (
      <div>
        <Divider hidden />
        <Loader active={fetching} size="big" />
        <Header disabled={fetching} size="tiny">
          <Icon name="calendar" />
          <Header.Content>
            Availabilities
            <Header.Subheader>
              {mappedArs.length} still available
            </Header.Subheader>
          </Header.Content>
        </Header>

        <Table unstackable className="availabilityMatches">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="left">Arrive</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Nights</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Site #</Table.HeaderCell>

              <Table.HeaderCell />
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
export default connected(AvailabilityMatches);
