import { applyMiddleware, createStore } from 'redux'

import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import { routerMiddleware } from 'connected-react-router'

import reducer from './reducers'

import { history } from './utils/history'

const middlewares = []

if (process.env.NODE_ENV === 'development') {
  const { createLogger } = require('redux-logger')
  const logger = createLogger({
    diff: false,
    level: {
      prevState: false,
      nextState: false
    }
  })

  middlewares.push(logger)
}

const middleware = applyMiddleware(promise(), thunk, ...middlewares, routerMiddleware(history))

export default createStore(reducer(history), middleware)
