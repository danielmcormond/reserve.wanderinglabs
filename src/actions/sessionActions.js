import axios from "axios";

import { history } from '../utils/history';
import { setFlashMessage } from '../actions/flashActions';

export function sessionNew(email) {
  return dispatch =>
    axios.post('http://wl.dev/login_tokens', { email })
      .then(function (response) {
        history.replace('/');
        dispatch(setFlashMessage('Being emailed', 'success'))
      })
      .catch(function (error) {
        history.replace('/');
        dispatch(setFlashMessage('Email not found. Create a new request.', 'error'))
      });
}

export function sessionCreate(token) {
  return dispatch =>
    axios.post('http://wl.dev/sessions', { token })
      .then(function (response) {
        localStorage.setItem('token', response.data.auth_token);

        dispatch(sessionSuccess(response.data.auth_token));

        history.replace('/edit');
        dispatch(setFlashMessage('logged in', 'success'));
      })
      .catch(function (error) {
        history.replace('/sign-in');
        dispatch(setFlashMessage('Bad Token', 'error'))
      });
}

export function sessionDestroy(token) {
  return function(dispatch) {
    localStorage.setItem('token', null);
    dispatch(sessionSuccess(null));
    history.replace('/');
    dispatch(setFlashMessage('logged out', 'success'));
  }
}

export function sessionSuccess(token) {
  return {
    type: 'SESSION_SUCCESS',
    payload: {
      token: token
    }
  }
}
