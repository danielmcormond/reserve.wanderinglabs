import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Menu
} from "semantic-ui-react";

import { Link } from "react-router-dom";
import { userSettings } from "../../actions/userActions";

import Premium from "./premium.js";
import UserEmail from "./email.js";
import UserTxt from "./txt.js";

@connect(store => {
  return {
    isAuthenticated: store.session.isAuthenticated,
    user: store.user.user
  };
})
export default class UserSettings extends Component {
  componentWillMount() {
    this.props.dispatch(userSettings());
  }

  render() {
    const { user, isAuthenticated } = this.props;

    return (
      <Container>
        <Grid>
          <Grid.Column computer="8" tablet="8" mobile="16">
            <Header as="h4">
              <Icon name="id badge" color="green" />
              <Header.Content>
                {user.email}
              </Header.Content>
            </Header>
            <Menu color="green">
              {isAuthenticated &&
                <Menu.Item name="sessionDestroy" as={Link} to="/sign-out">
                  Sign Out
                </Menu.Item>}
              {isAuthenticated &&
                <Menu.Item as={Link} to="/settings">
                  Account
                </Menu.Item>}
              {!!!isAuthenticated &&
                <Menu.Item name="sessionNew" as={Link} to="/sign-in">
                  Sign In
                </Menu.Item>}
            </Menu>

            <UserEmail />
            <Divider hidden />
            <UserTxt />

          </Grid.Column>
          <Grid.Column computer="8" tablet="8" mobile="16">
            <Premium />
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}
