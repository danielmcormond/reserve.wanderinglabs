import { applyMiddleware, createStore } from "redux";

import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import { routerMiddleware } from "react-router-redux";

import reducer from "./reducers";

import { history } from "./utils/history";

const middlewares = [];

if (process.env.NODE_ENV === "development") {
  const { logger } = require("redux-logger");

  middlewares.push(logger);
}

const middleware = applyMiddleware(
  promise(),
  thunk,
  ...middlewares,
  routerMiddleware(history)
);

export default createStore(reducer, middleware);
