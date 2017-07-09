import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from "react-redux"
import { Container } from 'semantic-ui-react'

import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'

import Layout from "./components/layout"
import Nav from "./components/nav"
import FlashMessage from "./components/flashMessage"
import New from "./components/new"
import SessionNew from "./components/sessions/new"
import SessionCreate from "./components/sessions/create"
import SessionDestroy from "./components/sessions/destroy"

import UserSettings from "./components/user/settings"
import requireAuth from "./components/sessions/authenticated"

import store from "./store"

import { history } from './utils/history'

import './normalize.css';
import './semantic/dist/semantic.min.css';
import './index.css';


const app = document.getElementById('root')

const token = localStorage.getItem('token');
if (token) {
  store.dispatch({ type: 'SESSION_SUCCESS', payload: { token }});
}


ReactDOM.render(
  <Provider store={store}>
    <div>

      <ConnectedRouter history={history}>
        <div>
          <Nav />
          <div className="navPadded">
            <Route path="/new" component={New} />

            <Container className="topPadded">
              <FlashMessage />
              <Route exact path="/" component={Layout}/>

              <Route exact path="/sign-in" component={SessionNew}/>
              <Route exact path="/sign-in/:token" component={SessionCreate}/>
              <Route exact path="/sign-out" component={SessionDestroy}/>

              <Route exact path="/settings" component={requireAuth(UserSettings)}/>
            </Container>
          </div>
        </div>
      </ConnectedRouter>
    </div>
  </Provider>,
  app
);

// import registerServiceWorker from './registerServiceWorker';
// registerServiceWorker();
