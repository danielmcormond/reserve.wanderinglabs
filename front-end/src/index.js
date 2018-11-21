import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";

import { userSettings } from "./actions/userActions";

import store from "./store";

import Layout from "./components/layout/index";

// import "./normalize.css";
import "./semantic/dist/semantic.min.css";
import "./index.css";

const app = document.getElementById("root");

const token = localStorage.getItem("token");
if (token && token !== "null") {
  store.dispatch({ type: "SESSION_SUCCESS", payload: { token } });
  store.dispatch(userSettings());
}

ReactDOM.render(
  <Provider store={store}>
    <Layout />
  </Provider>,
  app
);

// <Route path="/:uuid([a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12})" component={RequestHeader}/>

// Custom route based on if first app touch
// https://reacttraining.com/react-router/web/example/modal-gallery

// import registerServiceWorker from './registerServiceWorker';
// registerServiceWorker();
