import React, { Component } from 'react';
import { connect } from "react-redux"
import { Link } from 'react-router-dom'
import { Icon, Menu } from 'semantic-ui-react'

@connect((store) => {
  return {
    isAuthenticated: store.session.isAuthenticated
  };
})
export default class Nav extends Component {
  render() {
    const { isAuthenticated } = this.props;
    return (
      <Menu
        inverted
        fixed='top'
        color='green'
      >
        <Menu.Item
          header
          name='home'
          as={Link}
          to='/'
          header
        >
          Reserve
        </Menu.Item>

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

        <Menu.Item
          name='new'
          as={Link}
          to='/new'
          header
          position='right'
        >
          <Icon name='plus' />
        </Menu.Item>
      </Menu>
    );
  }
}
