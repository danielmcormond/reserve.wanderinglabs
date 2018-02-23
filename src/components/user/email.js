import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Header, Button, Icon, List, Segment } from "semantic-ui-react";

import { Link } from "react-router-dom";
import { userSettings } from "../../actions/userActions";

import Premium from "./premium.js";

import {
  addNotificationMethod,
  deleteNotificationMethod
} from "../../actions/userActions";

@connect(store => {
  return {
    user: store.user.user
  };
})
export default class UserEmail extends Component {
  state = { email: "" };

  addEmail = e => {
    const { email } = this.state;
    this.props.dispatch(addNotificationMethod("email", email));
    e.preventDefault();
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleChange(event) {
    this.setState({ email: event.target.value });
  }

  clickedItem(id) {
    this.props.dispatch(deleteNotificationMethod(id));
  }

  render() {
    const { user } = this.props;

    let filteredNms = _.filter(user.notification_methods, nm => {
      return nm.notification_type === "email";
    });

    const mappedNms = filteredNms.map(nm =>
      <List.Item key={nm.id}>
        {nm.locked === true}
        {nm.locked
          ? ""
          : <List.Content floated="right">
              <a onClick={() => this.clickedItem(nm.id)}>
                <Icon name="x" />
              </a>
            </List.Content>}

        <List.Content>
          <List.Header>
            {nm.param}
          </List.Header>
        </List.Content>
      </List.Item>
    );

    return (
      <div>
        <Segment>
          <Header as="h5">
            <Header.Content>Email Notifications</Header.Content>
          </Header>

          <List size="medium">
            {mappedNms}
          </List>

          <Form onSubmit={this.addEmail}>
            <Form.Input
              onChange={this.handleChange}
              ref={input => (this.input = input)}
              name="email"
              action={{
                color: "green",
                content: "Add Email"
              }}
            />
          </Form>
        </Segment>
      </div>
    );
  }
}
