import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Divider,
  Dropdown,
  Header,
  Icon,
  Loader,
  Table
} from "semantic-ui-react";

import DateFormat from "./utils/dateFormat";
import {
  fetchGroupedAvailabilities,
  groupedAvailabilitiesFilterSiteType,
  groupedAvailabilitiesSort
} from "../actions/facilitiesActions";

const siteTypeOptions = [
  {
    text: "RV Sites",
    description: "Only sites suitable for RV's",
    value: "rv"
  },
  {
    text: "Tent or RV Sites",
    description: "You can tent in an RV site",
    value: "tent_or_rv"
  },
  {
    text: "Tent Only Sites",
    description: "No RV's",
    value: "tent"
  },
  {
    text: "Group Sites",
    description: "You and your friends",
    value: "group"
  },
  {
    text: "Other",
    description: "Cabins, Day Use, etc",
    value: "other"
  }
];

const connected = connect(store => {
  return {
    avails: store.groupedAvailabilities.avails,
    filterSiteType: store.groupedAvailabilities.filterSiteType,
    sort: store.groupedAvailabilities.sort,
    sortDirection: store.groupedAvailabilities.sortDirection,
    fetching: store.groupedAvailabilities.fetching
  };
})
export class Facility extends Component {
  componentWillMount() {
    this.props.dispatch(fetchGroupedAvailabilities(this.props.match.params.id));
  }

  handleSiteTypeClick = (e, data) => {
    e.preventDefault();
    this.props.dispatch(groupedAvailabilitiesFilterSiteType(data.value));
  };

  handleSort = value => {
    this.props.dispatch(groupedAvailabilitiesSort(value));
  };

  render() {
    const {
      avails,
      filterSiteType,
      fetching,
      sort,
      sortDirection
    } = this.props;

    const filteredAvails = _.filter(avails, avail => {
      if (filterSiteType === null) {
        return true;
      } else {
        return avail.site.site_type === filterSiteType;
      }
    });

    let sortedAvails = _.sortBy(filteredAvails, [sort]);
    if (sortDirection === "descending") {
      sortedAvails = _.reverse(sortedAvails);
    }

    const mappedArs = sortedAvails.map(ar => {
      return (
        <Table.Row key={ar.id}>
          <Table.Cell textAlign="left">
            <Header size="tiny">
              <Header.Content>
                <DateFormat format="MM/DD/YY" date={ar.avail_min} />
                <Header.Subheader>
                  <DateFormat format="dddd" date={ar.avail_min} />
                </Header.Subheader>
              </Header.Content>
            </Header>
          </Table.Cell>
          <Table.Cell textAlign="left" collapsing>
            {ar.length}
          </Table.Cell>
          <Table.Cell textAlign="left">
            <Header size="tiny">
              <Header.Content>
                {ar.site.loop} {ar.site.site_num}
                <Header.Subheader>{ar.site.site_type2}</Header.Subheader>
              </Header.Content>
            </Header>
          </Table.Cell>
          <Table.Cell textAlign="right">
            <Icon name="external" size="large" link to="/" />
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
            <Header.Subheader>{mappedArs.length} available</Header.Subheader>
          </Header.Content>
        </Header>

        <Dropdown
          fluid
          selection
          options={siteTypeOptions}
          onChange={this.handleSiteTypeClick}
        />

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
                Nights
              </Table.HeaderCell>
              <Table.HeaderCell
                textAlign="left"
                sorted={sort === "site_num" ? sortDirection : null}
                onClick={() => this.handleSort("site_num")}
              >
                Site #
              </Table.HeaderCell>

              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>
          <Table.Body>{mappedArs}</Table.Body>
        </Table>
      </div>
    );
  }
}
export default connected(Facility);
