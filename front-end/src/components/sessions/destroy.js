import React, { Component } from 'react';
import { connect } from 'react-redux';

import { sessionDestroy } from "../../actions/sessionActions"

@connect((store) => {
  return {
  }
})
export default class SessionDestroy extends Component {
  componentWillMount() {
    this.props.dispatch(sessionDestroy())
  }

  render() {
    return (
      <h1>Logged Out...</h1>
    );
  }
}
