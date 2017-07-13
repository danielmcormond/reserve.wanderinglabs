import React, { Component } from 'react';
import { connect } from "react-redux"
import { Button, Divider, Grid, Header, Icon, List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
// import moment from 'moment';

import DateFormat from '../utils/dateFormat'

import { fetchAvailabilityRequest } from "../../actions/availabilityRequestsActions"
import AvailabilityMatches from '../availabilityMatches'


@connect((store) => {
  return {
    ar: store.availabilityRequests.ar
  };
})
export default class RequestShow extends Component {
  componentWillMount() {
    this.props.dispatch(fetchAvailabilityRequest(this.props.match.params.uuid))
  }

  render() {
    const { ar } = this.props;

    return (

    );
  }
}

