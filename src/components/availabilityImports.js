import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Header, Icon, Loader, Table } from "semantic-ui-react";

import DateFormat from "./utils/dateFormat";
import { fetchAvailabilityImports } from "../actions/availabilityImportsActions";

@connect(store => {
  return {
    imports: store.availabilityImports.imports,
    fetching: store.availabilityImports.fetching,
    fetched: store.availabilityImports.fetched
  };
})
export default class AvailabilityImports extends Component {
  componentWillMount() {
    if (this.props.fetched === false) {
      this.props.dispatch(fetchAvailabilityImports());
    }
  }

  render() {
    const { imports, fetching, sort, sortDirection } = this.props;
    const mappedImports = imports.map(log => {
      return (
        <Table.Row key={log.id}>
          <Table.Cell textAlign="left">
            <Header size="tiny">
              <Header.Content>
                {log.facility.name}
                <Header.Subheader>
                  <DateFormat
                    format="MM/DD/YY HH:mm:dd"
                    date={log.created_at}
                  />
                </Header.Subheader>
              </Header.Content>
            </Header>
          </Table.Cell>
          <Table.Cell textAlign="left" collapsing>
            <DateFormat format="MM/DD/YY" date={log.date_start} /> -
            <DateFormat format="MM/DD/YY" date={log.date_end} />
          </Table.Cell>
          <Table.Cell textAlign="left">
            {log.history_open_count}
          </Table.Cell>
          <Table.Cell textAlign="left">
            {log.history_filled_count}
          </Table.Cell>
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
          <Table unstackable sortable className="availabilityMatches">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell
                  textAlign="left"
                  sorted={sort === "avail_min" ? sortDirection : null}
                  onClick={() => this.handleSort("avail_min")}
                >
                  Arrive
                </Table.HeaderCell>
                <Table.HeaderCell
                  textAlign="left"
                  sorted={sort === "length" ? sortDirection : null}
                  onClick={() => this.handleSort("length")}
                >
                  Range scanned
                </Table.HeaderCell>
                <Table.HeaderCell
                  textAlign="left"
                  sorted={sort === "site_num" ? sortDirection : null}
                  onClick={() => this.handleSort("site_num")}
                >
                  # opened
                </Table.HeaderCell>
                <Table.HeaderCell
                  textAlign="left"
                  sorted={sort === "site_num" ? sortDirection : null}
                  onClick={() => this.handleSort("site_num")}
                >
                  # filled
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {mappedImports}
            </Table.Body>
          </Table>
          <Loader active={fetching} size="big" />
        </Grid.Column>
      </Grid>
    );
  }
}
