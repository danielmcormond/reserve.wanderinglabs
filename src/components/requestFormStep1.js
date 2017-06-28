import React, { Component } from 'react';
import { Control } from 'react-redux-form';

import FacilityLookup from './facilityLookup'

export default class RequestFormStep1 extends Component {

  render() {
    return (
      <div>
        <label>Facility</label>
        <div>
          <Control
            model="user.firstName"
            component={FacilityLookup}
          />
        </div>
      </div>
    )
  };
};
