import React, { Component } from 'react';
import RequestForm from './requestForm';
import RequestFormSteps from './requestFormSteps'
import { Container } from 'semantic-ui-react'

export default class New extends Component {
  render() {
    return (
      <div>
        <RequestFormSteps />
        <Container>
          <RequestForm />
        </Container>
      </div>
    );
  }
}
