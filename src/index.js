import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from "react-redux"
import { Container } from 'semantic-ui-react'

import createHistory from 'history/createBrowserHistory'

// import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

import { Router, Route } from 'react-router'

import Layout from "./components/layout"
import Nav from "./components/nav"
import New from "./components/new"
import store from "./store"

import './semantic/dist/semantic.min.css';
import './index.css';

const app = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    <div>

      <Router history={createHistory()}>
        <div>
          <Nav />

          <Container className='mainContainer'>
            <Route exact path="/" component={Layout}/>
            <Route path="/new" component={New}/>
          </Container>
        </div>
      </Router>
    </div>
  </Provider>,
  app
);

// import registerServiceWorker from './registerServiceWorker';
// registerServiceWorker();
