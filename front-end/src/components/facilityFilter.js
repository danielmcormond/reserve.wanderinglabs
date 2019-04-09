import React, { Component } from "react";
import { Button } from "semantic-ui-react";

import { filters } from "../filters";

export default class FacilityFilter extends Component {
  handleFilterChange = (event, data) => {
    this.props.onFilterChange(data);
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
