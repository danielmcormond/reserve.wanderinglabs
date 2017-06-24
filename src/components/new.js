import React, { Component } from 'react';
import { change } from 'redux-form';

import RequestForm from './requestForm';

export default class New extends Component {
  render() {
    return (
      <div>
        <RequestForm />
      </div>
    );
  }
}
