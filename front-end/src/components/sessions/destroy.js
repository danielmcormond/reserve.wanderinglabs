import React, { Component } from 'react';
import { connect } from 'react-redux';

import { sessionDestroy } from "../../actions/sessionActions"

const connected = connect((store) => {
  return {
  }
})
export class SessionDestroy extends Component {
  componentWillMount() {
    this.props.dispatch(sessionDestroy())
  }

  render() {
    return (
      <h1>Logged Out...</h1>
    );
  }
}
export default connected(SessionDestroy)
