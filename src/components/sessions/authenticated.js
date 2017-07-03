import React from 'react';

import { connect } from "react-redux"

// import { withRouter } from 'react-router';
import { history } from '../../utils/history';
import { setFlashMessage } from '../../actions/flashActions';

@connect((store) => {
  return {
    token: store.session.token,
    isAuthenticated: store.session.isAuthenticated
  };
})
export default function requireAuth(Component) {

  class SessionAuthenticated extends React.Component {

    componentWillMount() {
      this.checkAuth();
    }

    checkAuth() {

      if ( ! this.props.isAuthenticated) {
        const location = this.props.location;
        const redirect = location.pathname + location.search;

        history.replace('/');
        this.props.dispatch(setFlashMessage('Not authed', 'error'))
      }
    }

    render() {
      return this.props.isAuthenticated
        ? <Component { ...this.props } />
        : null;
    }

  }

  return SessionAuthenticated;
}
