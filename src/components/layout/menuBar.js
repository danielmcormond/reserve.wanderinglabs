import React, { Component } from "react";
import { connect } from "react-redux";
import { Sidebar, Menu, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

@connect(store => {
  return {
    isAuthenticated: store.session.isAuthenticated
  };
})
export default class MenuBar extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth
    };
  }

  handleResize = e => {
    this.setState({
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth
    });
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  menuRequests() {
    return (
      <Menu.Item name="requests" as={Link} to="/">
        <Icon name="list" />
        Requests
      </Menu.Item>
    );
  }

  menuSettings() {
    return (
      <Menu.Item name="settings" as={Link} to="/settings">
        <Icon name="setting" />
        Settings
      </Menu.Item>
    );
  }

  menuUser() {
    return (
      <Menu.Item name="user" as={Link} to="/sign-in">
        <Icon name="user" />
        Your Account
      </Menu.Item>
    );
  }

  render() {
    const { isAuthenticated, visible } = this.props;
    const { windowWidth } = this.state;

    return (
      <Sidebar
        as={Menu}
        animation="push"
        width="thin"
        visible={windowWidth > 992 || visible}
        color="grey"
        icon="labeled"
        vertical
        inverted
      >
        <Menu.Item name="add" as={Link} to="/new">
          <Icon name="add" />
          New Request
        </Menu.Item>

        {isAuthenticated ? this.menuRequests() : ""}
        {isAuthenticated ? this.menuSettings() : this.menuUser()}

        <Menu.Item name="premium" as={Link} to="/premium">
          <Icon name="star" color="yellow" />
          Go Premium
        </Menu.Item>

        <Menu.Item name="what" as={Link} to="/what">
          <Icon name="info" />
          About
        </Menu.Item>
      </Sidebar>
    );
  }
}
