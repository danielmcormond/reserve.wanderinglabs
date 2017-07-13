import React, { Component } from 'react';
import { Control } from 'react-redux-form';

import SemanticInput from '../../semanticInput'

export default class RequestFormStep4 extends Component {

  render() {
    return (
      <div>
        <Control
          model=".step4.email"
          component={SemanticInput}
          controlProps={{
            label: 'Email Address'
          }}
        />
      </div>
    )
  };
};
