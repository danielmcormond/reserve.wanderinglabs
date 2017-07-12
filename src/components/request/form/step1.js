import React, { Component } from 'react';
import { Control } from 'react-redux-form';
import { Header } from 'semantic-ui-react'

import FacilityLookup from '../../facilityLookup'

export default class RequestFormStep1 extends Component {

  render() {
    return (
      <div>
        <Header as='h4'>Campground or Facility to reserve at:</Header>
        <FacilityLookup />
      </div>
    )
  };
};
