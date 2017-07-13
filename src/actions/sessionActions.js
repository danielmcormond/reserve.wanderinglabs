import axios from "axios";

import { push } from 'react-router-redux'
import { setFlashMessage } from '../actions/flashActions';

export function sessionNew(email) {
  return dispatch =>
    axios.post('http://wl.dev/login_tokens', { email })
      .then(function (response) {
        dispatch(push('/'));
        dispatch(setFlashMessage('Being emailed', 'success'))
      })
      .catch(function (error) {
        dispatch(push('/'));
        dispatch(setFlashMessage('Email not found. Create a new request.', 'error'))
      });
}

export function sessionCreate(token) {
  return dispatch =>
    axios.post('http://wl.dev/sessions', { token })
      .then(function (response) {
        localStorage.setItem('token', response.data.auth_token);

        dispatch(sessionSuccess(response.data.auth_token));

        dispatch(push('/settings'));
        dispatch(setFlashMessage('logged in', 'success'));
      })
      .catch(function (error) {
        dispatch(push('/sign-in'));
        dispatch(setFlashMessage('Bad Token', 'error'))
      });
}

export function sessionDestroy(token) {
  return function(dispatch) {
    localStorage.setItem('token', null);
    dispatch(sessionSuccess(null));
    dispatch(push('/'));
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
