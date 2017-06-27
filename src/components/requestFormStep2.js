import React, { Component } from 'react';
import { Field } from 'redux-form';

import SemanticInput from './semanticInput'

export default class RequestFormStep2 extends Component {

  render() {
    return (
      <div>
        <label>Dates</label>
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
