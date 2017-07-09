import React, { Component } from 'react';
import { Form } from 'semantic-ui-react'

export default class SematicInput extends Component {
  render() {
    return (
      <Form.Input fluid {...this.props} />
    );
  }
}
