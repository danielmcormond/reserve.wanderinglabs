import React, { Component } from "react";
import { connect } from "react-redux";
import { Divider, Grid, Header, Icon, Menu } from "semantic-ui-react";

import { Link } from "react-router-dom";
import { userSettings } from "../../actions/userActions";

import Premium from "./premium.js";
import UserEmail from "./email.js";
import UserTxt from "./txt.js";

@connect(store => {
  return {
    isAuthenticated: store.session.isAuthenticated,
    user: store.user.user,
    premium: store.user.premium
  };
})
export default class UserSettings extends Component {
  componentWillMount() {
    this.props.dispatch(userSettings());
  }

  render() {
    const { user, isAuthenticated, premium } = this.props;

    return (
      <div>
        <Header as="h4">
          <Icon name="id badge" color="green" />
          <Header.Content>
            {user.email}
          </Header.Content>
        </Header>
        <Grid>
          <Grid.Column computer="8" tablet="8" mobile="16">
            <Menu color="green">
              {isAuthenticated &&
                <Menu.Item name="sessionDestroy" as={Link} to="/sign-out">
                  Sign Out
                </Menu.Item>}

              {!!!isAuthenticated &&
                <Menu.Item name="sessionNew" as={Link} to="/sign-in">
                  Sign In
                </Menu.Item>}
            </Menu>

            {premium
              ? <div>
                  <UserEmail />
                  <Divider hidden />
                  <UserTxt />
                </div>
              : <p>Premium members can get notified via SMS.</p>}
          </Grid.Column>
          <Grid.Column computer="8" tablet="8" mobile="16">
            <Premium />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

// {isAuthenticated &&
//   <Menu.Item as={Link} to="/settings">
//     Account
//   </Menu.Item>}
