import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Header, Input, List, Segment } from "semantic-ui-react";

import { Link } from "react-router-dom";
import { userSettings } from "../../actions/userActions";

import Premium from "./premium.js";

@connect(store => {
  return {
    user: store.user.user
  };
})
export default class UserTxt extends Component {
  addNumber = e => {
    console.log(this.input);
    const phoneNumber = this.input.value;
    console.log("submit", phoneNumber);
    e.preventDefault();
  };

  render() {
    const { user } = this.props;

    return (
      <div>
        <Segment>
          <Header as="h5">
            <Header.Content>Txt Notifications</Header.Content>
          </Header>

          <List size="medium">
            <List.Item key={user.email}>
              <List.Content>
                <List.Header>
                  {user.email}
                </List.Header>
              </List.Content>
            </List.Item>
          </List>

          <Form onSubmit={this.addNumber}>
            <Input
              ref={input => (this.input = input)}
              name="phoneNumber"
              action={{
                color: "green",
                content: "Add Number"
              }}
            />
          </Form>
        </Segment>
      </div>
    );
  }
}
