import { push } from "react-router-redux";

import reserveApi from "../utils/axios";
import { setFlashMessage } from "../actions/flashActions";

export function sessionNew(email) {
  return dispatch =>
    reserveApi({
      method: "post",
      url: "/login_tokens",
      data: { email }
    })
      .then(function(response) {
        dispatch(push("/"));
        dispatch(setFlashMessage("Being emailed", "success"));
      })
      .catch(function(error) {
        dispatch(push("/"));
        dispatch(
          setFlashMessage("Email not found. Create a new request.", "error")
        );
      });
}

export function sessionCreate(token, redirect = null) {
  return dispatch =>
    reserveApi({
      method: "post",
      url: "/sessions",
      data: { token }
    })
      .then(function(response) {
        dispatch(sessionSuccess(response.data.auth_token));
        dispatch({ type: "FETCH_USER_FULFILLED", payload: response.data.user });
        dispatch(push(redirect || "/"));
        // dispatch(setFlashMessage("logged in", "success"));
      })
      .catch(function(error) {
        dispatch(push("/sign-in"));
        dispatch(setFlashMessage("Bad Token", "error"));
      });
}

export function sessionCreateNoRedirect(token) {
  return dispatch =>
    reserveApi({
      method: "post",
      url: "/sessions",
      data: { token }
    })
      .then(function(response) {
        dispatch(sessionSuccess(response.data.auth_token));
        dispatch({ type: "FETCH_USER_FULFILLED", payload: response.data.user });
      })
      .catch(function(error) {
        dispatch(setFlashMessage("Bad Token", "error"));
      });
}

export function sessionDestroy(token) {
  return function(dispatch) {
    localStorage.removeItem("token");
    dispatch(sessionSuccess(null));
    dispatch(push("/"));
    dispatch(setFlashMessage("logged out", "success"));
  };
}

export function sessionSuccess(token) {
  localStorage.setItem("token", token);
  return {
    type: "SESSION_SUCCESS",
    payload: {
      token: token
    }
  };
}