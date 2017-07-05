import React, { Component } from 'react';
import { connect } from "react-redux"
import { Header, Menu } from 'semantic-ui-react'

import { Link } from 'react-router-dom'
import { userSettings } from "../../actions/userActions"

@connect((store) => {
  return {
    isAuthenticated: store.session.isAuthenticated,
    user: store.user.user
  };
})
export default class UserSettings extends Component {

  componentWillMount() {
    this.props.dispatch(userSettings())
  }

  render() {
    const { user, isAuthenticated } = this.props;

    return (
      <div>
        <Header as='h1'>{user.email}</Header>
        <Menu color='green'>
        { isAuthenticated &&
          <Menu.Item name='sessionDestroy' as={Link} to='/sign-out'>
            Sign Out
          </Menu.Item>
        }
        { isAuthenticated &&
          <Menu.Item as={Link} to='/edit'>
            Account
          </Menu.Item>
        }
        { !!!isAuthenticated &&
          <Menu.Item name='sessionNew' as={Link} to='/sign-in'>
            Sign In
          </Menu.Item>
        }
        </Menu>

      </div>
    );
  }
}

