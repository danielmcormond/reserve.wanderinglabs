import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Grid, Header, Icon, List, Loader, Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
import debounce from "debounce";

import DateFormat from "./utils/dateFormat";
import { fetchAvailabilityImports } from "../actions/availabilityImportsActions";
import AvailabilityImportsHistory from "./imports/history";
import FacilityFilter from "./facilityFilter";

const connected = connect(store => {
  return {
    imports: store.availabilityImports.imports,
    fetching: store.availabilityImports.fetching,
    fetched: store.availabilityImports.fetched
  };
});
export class AvailabilityImports extends Component {
  state = { filter: [] };

  doFetchAvailabilityImports = debounce(() => {
    const { filter } = this.state;

    const facilityId = this.props.facilityId || this.props.match.params.id;
    const expanded = this.props.expanded;
    this.props.dispatch(fetchAvailabilityImports(facilityId, expanded, filter));
  }, 400);

  componentWillMount() {
    this.doFetchAvailabilityImports();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.expanded !== nextProps.expanded) {
      this.doFetchAvailabilityImports();
    }
  }

  canExpand() {
    return !this.props.expanded;
  }

  toggleFilter = filter => {
    this.setState({ filter }, () => {
      this.doFetchAvailabilityImports();
    });
  };

  render() {
    const { filter } = this.state;
    const { imports, fetching } = this.props;

    const facilityId = this.props.facilityId || this.props.match.params.id;

    const mappedImports = imports.map(log => {
      return (
        <Table.Row key={log.id}>
          <Table.Cell textAlign="left">
            <Header size="tiny">
              {!facilityId && (
                <Header.Content>
                  <Link to={`/f/${log.facility.id}/log`}>{log.facility.name}</Link>
                  <Header.Subheader>
                    <DateFormat format="MM/DD/YY hh:mm:ss" date={log.created_at} />
                  </Header.Subheader>
                </Header.Content>
              )}
            </Header>

            {log.history_open && <AvailabilityImportsHistory histories={log.history_open} color="green" />}
            {log.history_filled && <AvailabilityImportsHistory histories={log.history_filled} color="red" />}
          </Table.Cell>
          <Table.Cell textAlign="left" collapsing>
            <DateFormat format="MM/DD/YY" date={log.date_start} /> -{" "}
            <DateFormat format="MM/DD/YY" date={log.date_end} />
          </Table.Cell>
          <Table.Cell textAlign="left">{log.history_open_count}</Table.Cell>
          <Table.Cell textAlign="left">{log.history_filled_count}</Table.Cell>
        </Table.Row>
      );
    });

    return (
      <Grid>
        <Grid.Column computer="16" tablet="16" mobile="16">
          <Header as="h4">
            <Icon name="list layout" />
            <Header.Content>Logs:</Header.Content>
          </Header>
          {!facilityId && <FacilityFilter filter={filter} onFilterChange={this.toggleFilter} />}
          <List>
            <List.Item>
              <strong>Range</strong> - Date range searched
            </List.Item>
            <List.Item>
              <strong>Opened</strong> - Number of new availabilities. (A site newly open for a night)
            </List.Item>
            <List.Item>
              <strong>Filled</strong> - Number of sites filled/reserved.
            </List.Item>
          </List>
          {this.canExpand() && <Link to={{ pathname: `expanded` }}>Expand</Link>}

          <Table unstackable sortable className="availabilityMatches">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="left">Facility</Table.HeaderCell>
                <Table.HeaderCell textAlign="left">Range</Table.HeaderCell>
                <Table.HeaderCell textAlign="left">Opened</Table.HeaderCell>
                <Table.HeaderCell textAlign="left">Filled</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>{mappedImports}</Table.Body>
          </Table>
          <Loader active={fetching} size="big" />
        </Grid.Column>
      </Grid>
    );
  }
}
export default connected(AvailabilityImports);
