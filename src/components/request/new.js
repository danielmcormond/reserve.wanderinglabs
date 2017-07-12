import React, { Component } from 'react';
import { Divider } from 'semantic-ui-react'

import RequestForm from './form/index';
import RequestFormStepButtons from './form/stepButtons'

export default class New extends Component {
  render() {
    return (
      <div>
        <RequestForm />
        <Divider hidden />
        <RequestFormStepButtons/>
      </div>
    );
  }
}
