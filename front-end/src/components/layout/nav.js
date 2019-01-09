import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Icon, Menu } from "semantic-ui-react";

const connected = connect(store => {
  return {
    isAuthenticated: store.session.isAuthenticated
  };
})
export class Nav extends Component {
  constructor(props) {
    super(props);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu(e) {
    this.props.onSidebarToggle();
  }

  menuUser() {
    const { isAuthenticated } = this.props;
    return (
      <Menu.Item as={Link} to={isAuthenticated ? "/settings" : "/sign-in"} icon>
        <Icon name="user" size="large" />
      </Menu.Item>
    );
  }

  menuNew() {
    return (
      <Menu.Item as={Link} to="/new" icon>
        <Icon name="plus" size="large" />
      </Menu.Item>
    );
  }

  menuSidebar() {
    return (
      <Menu.Item icon onClick={this.toggleMenu} className="mobile only">
        <Icon name="sidebar" size="large" />
      </Menu.Item>
    );
  }

  render() {
    return (
      <div>
        <Menu
          fixed="top"
          inverted
          color="green"
          size="large"
          as={Container}
          fluid
        >
          {this.menuSidebar()}
          <Menu.Item header name="home" as={Link} to="/">
            Wandering Labs :: Reserve
          </Menu.Item>
          <Menu.Menu position="right">
            {this.menuUser()}
            {this.menuNew()}
          </Menu.Menu>
        </Menu>
        <div className="NavPushed" />
      </div>
    );
  }
}
export default connected(Nav);
/**
<Popup
  trigger={this.menuUser()}
  content="Sign In"
  position="bottom right"
  inverted
  hoverable
/>
<Popup
  trigger={this.menuNew()}
  content="New Request"
  position="bottom right"
  inverted
  hoverable
  on="hover"
  hideOnScroll
/>
**/
// fitted='horizontally'
// <Menu.Item name='new' as={Link} to='/new' position='right' className='MenuPremium'>
//   <Label content='Premium' icon='trophy' color='orange' />
// </Menu.Item>
