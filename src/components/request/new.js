import React, { Component } from 'react';
import { Container, Divider } from 'semantic-ui-react'

import RequestForm from './form/index';
import RequestFormStepButtons from './form/stepButtons'

export default class New extends Component {
  render() {
    return (
      <div>
        <Container>
          <RequestForm />
        </Container>
        <Divider hidden />
        <Container>
          <RequestFormStepButtons/>
        </Container>
      </div>
    );
  }
}
