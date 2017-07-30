import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { Container } from "semantic-ui-react";

import { Route } from "react-router";
import { ConnectedRouter } from "react-router-redux";

import MatchReserve from "./components/matchReserve";

import RequestShow from "./components/request/show";
import RequestFormSteps from "./components/request/form/steps";
import RequestForm from "./components/request/form/index";

// import RequestHeader from "./components/requestHeader"
import Requests from "./components/requests";
import Footer from "./components/footer";
import Nav from "./components/nav";
import FrontPage from "./components/frontPage";
import Facility from "./components/facility";
import Loading from "./components/loading";
import FlashMessage from "./components/flashMessage";

import SessionNew from "./components/sessions/new";
import SessionCreate from "./components/sessions/create";
import SessionDestroy from "./components/sessions/destroy";

import UserSettings from "./components/user/settings";
import requireAuth from "./components/sessions/authenticated";
import AvailabilityImports from "./components/availabilityImports";

import store from "./store";

import { history } from "./utils/history";

// import "./normalize.css";
import "./semantic/dist/semantic.min.css";
import "./index.css";

const app = document.getElementById("root");

const token = localStorage.getItem("token");
if (token && token !== "null") {
  store.dispatch({ type: "SESSION_SUCCESS", payload: { token } });
}

ReactDOM.render(
  <Provider store={store}>
    <div>
      <ConnectedRouter history={history}>
        <div>
          <Loading />
          <Nav />
          <Route path="/new" component={RequestFormSteps} />

          <Container className="mainContainer">
            <FlashMessage />

            <Route
              exact
              path="/"
              component={requireAuth(Requests, FrontPage)}
            />
            <Route path="/new" component={RequestForm} />
            <Route
              path="/:uuid([a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12})"
              component={RequestShow}
            />
            <Route
              path="/:status([ca]{1})/:uuid([a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12})"
              component={RequestShow}
            />

            <Route exact path="/:from([wet]{1})/:id" component={MatchReserve} />

            <Route exact path="/f/:id" component={Facility} />

            <Route exact path="/log" component={AvailabilityImports} />
            <Route exact path="/log/:id" component={AvailabilityImports} />

            <Route exact path="/sign-in" component={SessionNew} />
            <Route exact path="/sign-in/:token" component={SessionCreate} />
            <Route exact path="/sign-out" component={SessionDestroy} />

            <Route
              exact
              path="/settings"
              component={requireAuth(UserSettings, SessionNew)}
            />
          </Container>
          <Footer />
        </div>
      </ConnectedRouter>
    </div>
  </Provider>,
  app
);

// <Route path="/:uuid([a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12})" component={RequestHeader}/>

// Custom route based on if first app touch
// https://reacttraining.com/react-router/web/example/modal-gallery

// import registerServiceWorker from './registerServiceWorker';
// registerServiceWorker();
