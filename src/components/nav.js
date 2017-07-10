import React, { Component } from 'react';
import { connect } from "react-redux"
import { Link } from 'react-router-dom'
import { Container, Icon, Menu } from 'semantic-ui-react'

@connect((store) => {
  return {
    isAuthenticated: store.session.isAuthenticated
  };
})
export default class Nav extends Component {
  render() {
    const { isAuthenticated } = this.props;
    return (
      <div>
        <Menu fixed='top' inverted color='green' size='large'>
          <Container>
            <Menu.Item as={Link} to={ isAuthenticated ? '/settings' : '/sign-in'} fitted='horizontally' icon>
              <Icon name='settings' />
            </Menu.Item>
            <Menu.Item header name='home' as={Link} to='/'>
              Wandering Labs :: Reserve
            </Menu.Item>
            <Menu.Item name='new' as={Link} to='/new' position='right' fitted='horizontally'>
              <Icon name='plus' />
            </Menu.Item>
          </Container>
        </Menu>
        <div className="NavPushed" />
      </div>
    );
  }
}
