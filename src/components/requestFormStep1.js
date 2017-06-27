import React, { Component } from 'react';
import { Field } from 'redux-form';

import FacilityLookup from './facilityLookup'

export default class RequestFormStep1 extends Component {

  render() {
    return (
      <div>
        <label>Facility</label>
        <div>
          <Field name="facility_id" component="input" />
        </div>

        <div>
          <FacilityLookup />
        </div>
      </div>
    )
  };
};
