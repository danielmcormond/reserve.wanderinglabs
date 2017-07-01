import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Icon, Menu } from 'semantic-ui-react'

export default class Nav extends Component {
  render() {
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
