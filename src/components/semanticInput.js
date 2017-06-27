import React, { Component } from 'react';
import { Input } from 'semantic-ui-react'

export default class SematicInput extends Component {
  render() {
    return (
      <Input size='big' icon='search' placeholder='Search...' />
    );
  }
}
