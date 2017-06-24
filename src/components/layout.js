import React, { Component } from 'react';
import { connect } from "react-redux"
import { Header, Loader } from 'semantic-ui-react'

import { fetchAvailabilityRequests } from "../actions/availabilityRequestsActions"

@connect((store) => {
  return {
    ars: store.availabilityRequests.ars,
    loading: store.availabilityRequests.fetching,
  };
})


export default class Layout extends Component {

  componentWillMount() {
    this.props.dispatch(fetchAvailabilityRequests())
  }

  fetchAvailabilityRequests() {
    this.props.dispatch(fetchAvailabilityRequests())
  }

  render() {
    const { ars, loading } = this.props;
    const mappedArs = ars.map(ar => <li key={ar.id}>{ar.id} {ar.facility_id}</li>);

    return (
      <div>
        <Header as='h1'>WanderingLabs - {loading ? 'T' : 'F'}</Header>

        <Loader active={loading}>Loading</Loader>
        <ul>{mappedArs}</ul>

        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.</p>

        <button onClick={this.fetchAvailabilityRequests.bind(this)}>reload</button>
      </div>
    );
  }
}

