import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from "react-redux"
import { Search, Grid, Header } from 'semantic-ui-react'

import { fetchFacilities } from "../actions/facilitiesActions"

@connect((store) => {
  return {
    facilities: store.facilities.facilities,
    loading: store.availabilityRequests.fetching,
  };
})

export default class FacilityLookup extends Component {
  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, result) => this.setState({ value: result.title })

  handleSearchChange = (e, value) => {
    this.setState({ value })
    this.props.dispatch(fetchFacilities(value))
  }

  render() {
    const { facilities, loading } = this.props;
    const { value } = this.state

    return (
      <Search
        loading={loading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={this.handleSearchChange}
        results={facilities}
        value={value}
        size='large'
        fluid
      />
    )
  };
};
