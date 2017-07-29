import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, List, Segment } from "semantic-ui-react";

@connect(store => {
  return {
    user: store.user.user
  };
})
export default class UserEmail extends Component {
  render() {
    const { user } = this.props;

    return (
      <div>
        <Segment>
          <Header as="h5">
            <Header.Content>Email Notifications</Header.Content>
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
          <p>Ability to add multiple emails coming soon.</p>
        </Segment>
      </div>
    );
  }
}
