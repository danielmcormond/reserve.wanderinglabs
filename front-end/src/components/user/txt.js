import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Header, Icon, List, Segment } from "semantic-ui-react";

import {
  addNotificationMethod,
  deleteNotificationMethod
} from "../../actions/userActions";

const connected = connect(store => {
  return {
    user: store.user.user
  };
})
export class UserTxt extends Component {
  state = { phoneNumber: "" };

  addNumber = e => {
    const { phoneNumber } = this.state;
    this.props.dispatch(addNotificationMethod("sms", phoneNumber));
    e.preventDefault();
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleChange(event) {
    this.setState({ phoneNumber: event.target.value });
  }

  clickedItem(id) {
    this.props.dispatch(deleteNotificationMethod(id));
  }

  render() {
    const { user } = this.props;

    let filteredNms = _.filter(user.notification_methods, nm => {
      return nm.notification_type === "sms";
    });

    const mappedNms = filteredNms.map(nm =>
      <List.Item key={nm.id}>
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
            <Header.Content>SMS Notifications</Header.Content>
            <Header.Subheader>
              {user.sms_count} of {user.sms_limit} messages used.
            </Header.Subheader>
          </Header>

          <List size="medium">
            {mappedNms}
          </List>

          <Form onSubmit={this.addNumber}>
            <Form.Input
              onChange={this.handleChange}
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
export default connected(UserTxt);
