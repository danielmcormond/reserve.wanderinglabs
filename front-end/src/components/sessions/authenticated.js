import React from "react";

import { connect } from "react-redux";

// import { history } from "../../utils/history";
// import { setFlashMessage } from "../../actions/flashActions";

export default function requireAuth(Component, Component2 = null) {
  @connect(store => {
    return {
      token: store.session.token,
      isAuthenticated: store.session.isAuthenticated
    };
  })
  class SessionAuthenticated extends React.Component {
    // componentWillMount() {
    //   this.checkAuth();
    // }

    // checkAuth() {
    //   if (!this.props.isAuthenticated) {
    //     history.replace("/");
    //     this.props.dispatch(setFlashMessage("Not authed", "error"));
    //   }
    // }

    render() {
      return this.props.isAuthenticated
        ? <Component {...this.props} />
        : <Component2 {...this.props} />;
    }
  }

  return SessionAuthenticated;
}
