import React, { Component } from 'react';
import { connect } from "react-redux"
import { Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

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
        <Container>
          HW - {ar.uuid}
        </Container>
        <AvailabilityMatches {...this.props}/>
      </div>
    );
  }
}

