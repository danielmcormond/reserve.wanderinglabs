import React, { Component } from 'react';
import { Control } from 'react-redux-form';
import { Input } from 'semantic-ui-react'

import SemanticInput from './semanticInput'

export default class RequestFormStep3 extends Component {

  render() {
    return (
      <div>
        <label>Options</label>
        <div>
          <Control
            model="user.firstName"
            component={SemanticInput}
          />
          <Input size='huge' placeholder='Search...' />
        </div>
      </div>
    )
  };
};
