import { push } from "connected-react-router";

import reserveApi from "../utils/axios";
import { setFlashMessage } from "../actions/flashActions";
import * as AppConstants from "../utils/constants";

export const sessionNew = email => {
  return dispatch =>
    reserveApi({
      method: "post",
      url: "/login_tokens",
      data: { email }
    })
      .then(() => {
        dispatch(push("/"));
        dispatch(setFlashMessage(AppConstants.SESSION_SUCCESS, "success"));
      })
      .catch(() => {
        dispatch(push("/"));
        dispatch(
          setFlashMessage(AppConstants.SESSION_FAILURE, "error")
        );
      });
};

export const sessionCreate = (token, redirect = null) => {
  return dispatch =>
    reserveApi({
      method: "post",
      url: "/sessions",
      data: { token }
    })
      .then(response => {
        dispatch(sessionSuccess(response.data.auth_token));
        dispatch({ type: "FETCH_USER_FULFILLED", payload: response.data.user });
        dispatch(push(redirect || "/"));
        // dispatch(setFlashMessage("logged in", "success"));
      })
      .catch(() => {
        dispatch(push("/sign-in"));
        dispatch(setFlashMessage(AppConstants.SESSION_BAD_TOKEN, "error"));
      });
};

export const sessionCreateNoRedirect = token => {
  return dispatch =>
    reserveApi({
      method: "post",
      url: "/sessions",
      data: { token }
    })
      .then(response => {
        dispatch(sessionSuccess(response.data.auth_token));
        dispatch({ type: "FETCH_USER_FULFILLED", payload: response.data.user });
      })
      .catch(() => {
        dispatch(setFlashMessage(AppConstants.SESSION_BAD_TOKEN, "error"));
      });
};

export const sessionDestroy = () => {
  return dispatch => {
    localStorage.removeItem("token");
    dispatch(sessionSuccess(null));
    dispatch(push("/"));
    dispatch(setFlashMessage(AppConstants.SESSION_LOGGED_OUT, "success"));
  };
};

export const sessionSuccess = token => {
  localStorage.setItem("token", token);
  return {
    type: "SESSION_SUCCESS",
    payload: { token }
  };
};
