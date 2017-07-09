import React, { Component } from 'react';
import { Container, Divider } from 'semantic-ui-react'

import RequestForm from './requestForm';
import RequestFormSteps from './requestFormSteps'
import RequestFormStepButtons from './requestFormStepButtons'

export default class New extends Component {
  render() {
    return (
      <div>
        <RequestFormSteps />
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
