import React, { Component } from 'react';
import { Field } from 'redux-form';

import SemanticInput from './semanticInput'

export default class RequestFormStep3 extends Component {

  render() {
    return (
      <div>
        <label>Options</label>
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
