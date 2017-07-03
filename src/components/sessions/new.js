import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Control, Form } from 'react-redux-form';
import { Button, Input } from 'semantic-ui-react'

import { sessionNew } from "../../actions/sessionActions"


const EmailInput = (props) => <Input size='huge' placeholder='Email Address' {...props} />;

@connect((store) => {
  return {
  }
})
export default class SessionNew extends Component {
  handleSubmit(val) {
    this.props.dispatch(sessionNew(val.forms.email.value))
    // TODO: val.forms.email.value can't be correct...
  }

  render() {
    return (
      <Form model="sessionForm" className='ui form' onSubmit={(val) => this.handleSubmit(val)}>
        <div className='field'>
          <label>Email Address</label>
          <Control.text model=".email" component={EmailInput} />
        </div>
        <Button color='green'>Email me a sign in link!</Button>
      </Form>
    );
  }
}
