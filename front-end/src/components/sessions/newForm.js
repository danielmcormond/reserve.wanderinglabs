import React, { Component } from "react";
import { connect } from "react-redux";
import { Control, Form } from "react-redux-form";
import { Button, Input } from "semantic-ui-react";

import { sessionNew } from "../../actions/sessionActions";

const EmailInput = props => (
  <Input size="huge" placeholder="Email Address" {...props} />
);

const connected = connect(store => {
  return {};
});
export class SessionNewForm extends Component {
  handleSubmit(val) {
    this.props.dispatch(sessionNew(val.forms.email.value));
    // TODO: val.forms.email.value can't be correct...
  }

  render() {
    return (
      <Form
        model="sessionForm"
        className="ui form"
        onSubmit={val => this.handleSubmit(val)}
      >
        <div className="field">
          <Control.text
            model=".email"
            component={EmailInput}
            controlProps={{ placeholder: "Enter Email Address" }}
          />
        </div>
        <Button color="green" content="Email me a sign in link!" />
      </Form>
    );
  }
}
export default connected(SessionNewForm);
