import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Control, Form } from 'react-redux-form';
import { Button, Input } from 'semantic-ui-react'

import { sessionCreate } from "../../actions/sessionActions"

@connect((store) => {
  return {
  }
})
export default class SessionCreate extends Component {
  componentWillMount() {
    this.props.dispatch(sessionCreate(this.props.match.params.token))
  }

  render() {
    return (
      <h1>Logging in...</h1>
    );
  }
}
