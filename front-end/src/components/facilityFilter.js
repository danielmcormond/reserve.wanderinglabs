import React, { Component } from "react";
import { Button } from "semantic-ui-react";

import { filters } from "../filters";

export default class FacilityFilter extends Component {
  handleFilterChange = (event, data) => {
    let { filter } = this.props;
    if (filter.indexOf(data.name) > -1) {
      filter = filter.filter(item => item !== data.name);
    } else {
      filter.push(data.name);
    }

    this.props.onFilterChange(filter);
  };

  render() {
    const { filter } = this.props;

    const mappedFilters = filters.map(filterItem => (
      <Button
        toggle
        size="mini"
        onClick={this.handleFilterChange}
        as="a"
        active={filter.indexOf(filterItem.name) > -1}
        {...filterItem}
      />
    ));

    return (
      <p>
        Filter on:
        <br />
        {mappedFilters}
      </p>
    );
  }
}
