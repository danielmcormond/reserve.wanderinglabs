import React, { Component } from "react";
import { connect } from "react-redux";
import { Control, Form } from "react-redux-form";
import { Button, Divider, Grid, Header, Icon, Input } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { sessionNew } from "../../actions/sessionActions";

const EmailInput = props =>
  <Input size="huge" placeholder="Email Address" {...props} />;

const connected = connect(store => {
  return {};
})
export class SessionNew extends Component {
  handleSubmit(val) {
    this.props.dispatch(sessionNew(val.forms.email.value));
    // TODO: val.forms.email.value can't be correct...
  }

  render() {
    return (
      <Grid>
        <Grid.Column computer="8" tablet="12" mobile="16">
          <Header as="h2">
            <Icon name="user" color="green" />
            <Header.Content>
              Your Account
              <Header.Subheader>
                We don't use passwords.
                <br />
                We email you a special link to access your account.
              </Header.Subheader>
            </Header.Content>
          </Header>

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

          <Divider hidden />
          <Divider />

          <Header as="h4" content="Haven't used us yet?" />

          <Button
            as={Link}
            to="/new"
            color="green"
            size="tiny"
            content="Create a new request!"
          />
        </Grid.Column>
      </Grid>
    );
  }
}
export default connected(SessionNew);
