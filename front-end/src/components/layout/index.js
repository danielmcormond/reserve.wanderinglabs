import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Sidebar } from "semantic-ui-react";

import { Route } from "react-router";
import { ConnectedRouter } from "react-router-redux";

import { history } from "../../utils/history";

import RequestAll from "../request/all";
import RequestForm from "../request/form/index";
import RequestFormSteps from "../request/form/steps";
import RequestShow from "../request/show";
import RequestSuccess from "../request/success";

import Nav from "./nav";
import MenuBar from "./menuBar";
import FrontPage from "../frontPage";
import Facility from "../facility";

import FlashMessage from "../flashMessage";

import SessionNew from "../sessions/new";
import SessionCreate from "../sessions/create";
import SessionDestroy from "../sessions/destroy";

import UserSettings from "../user/settings";
import requireAuth from "../sessions/authenticated";
import AvailabilityImports from "../availabilityImports";
import AvailabilityMatchClick from "../availabilityMatchClick";

import PagePremium from "../pages/premium";
import PageAbout from "../pages/about";

@connect(store => {
  return {
    isAuthenticated: store.session.isAuthenticated
  };
})
export default class Layout extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.handleSidebarToggle = this.handleSidebarToggle.bind(this);
    this.state = {
      visibleSidebar: false
    };
  }

  handleSidebarToggle() {
    this.setState({ visibleSidebar: !this.state.visibleSidebar });
  }

  render() {
    const visibleSidebar = this.state.visibleSidebar;
    return (
      <ConnectedRouter history={history}>
        <div>
          <Nav onSidebarToggle={this.handleSidebarToggle} />

          <Sidebar.Pushable>
            <MenuBar visible={visibleSidebar} />
            <Sidebar.Pusher className="mainContainer" as={Container}>
              <FlashMessage />
              <Route path="/new" component={RequestFormSteps} />

              <Route
                exact
                path="/"
                component={requireAuth(RequestAll, FrontPage)}
              />
              <Route path="/new" component={RequestForm} />
              <Route path="/success" component={RequestSuccess} />

              <Route
                path="/:uuid([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12})"
                component={RequestShow}
              />
              <Route
                path="/:status([cag]{1})/:uuid([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12})"
                component={RequestShow}
              />

              <Route
                exact
                path="/:from([wet]{1})/:id"
                component={AvailabilityMatchClick}
              />

              <Route exact path="/f/:id" component={Facility} />
              <Route path="/f/:id/log" component={AvailabilityImports} />

              <Route exact path="/log" component={AvailabilityImports} />

              <Route exact path="/sign-in" component={SessionNew} />
              <Route exact path="/sign-in/:token" component={SessionCreate} />
              <Route
                exact
                path="/sign-in/:token/settings"
                render={props => (
                  <SessionCreate {...props} redirect="/settings" />
                )}
              />
              <Route exact path="/sign-out" component={SessionDestroy} />

              <Route exact path="/premium" component={PagePremium} />
              <Route exact path="/about" component={PageAbout} />

              <Route
                exact
                path="/settings"
                component={requireAuth(UserSettings, SessionNew)}
              />
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </div>
      </ConnectedRouter>
    );
  }
}
