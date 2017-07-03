import React, { Component } from 'react';
import { connect } from "react-redux"
import { Header } from 'semantic-ui-react'

import { userSettings } from "../../actions/userActions"

@connect((store) => {
  return {
    user: store.user.user
  };
})
export default class UserSettings extends Component {

  componentWillMount() {
    this.props.dispatch(userSettings())
  }

  render() {
    const { user } = this.props;

    return (
      <div>
        <Header as='h1'>{user.email}</Header>
      </div>
    );
  }
}

