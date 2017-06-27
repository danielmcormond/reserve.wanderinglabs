import React, { Component } from 'react';
import { Field } from 'redux-form';

import SemanticInput from './semanticInput'

export default class RequestFormStep4 extends Component {

  render() {
    return (
      <div>
        <label>Alerts</label>
        <div>
          <Field
            name="dates"
            component={SemanticInput}
          />
        </div>
      </div>
    )
  };
};
