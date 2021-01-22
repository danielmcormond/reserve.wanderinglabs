import _ from "lodash";

import reserveApi from "../utils/axios";
import store from "../store";
import { sessionCreateNoRedirect } from "../actions/sessionActions";

export function fetchAvailabilityRequests(expired = false) {
  return function(dispatch) {
    dispatch({ type: "FETCH_ARS" });
    reserveApi({ method: "get", url: `/availability_requests${expired ? '/inactive' : ''}.json` })
      .then(response => {
        if (expired) {
        dispatch({ type: "FETCH_ARS_EXPIRED_FULFILLED", payload: response.data });
        }else {
        dispatch({ type: "FETCH_ARS_FULFILLED", payload: response.data });
        }
      })
      .catch(err => {
        dispatch({ type: "FETCH_ARS_REJECTED", payload: err });
      });
  };
}

export function fetchAvailabilityRequest(uuid) {
  return function(dispatch) {
    dispatch({ type: "FETCH_AR" });

    let cachedAr = _.find(store.getState().availabilityRequests.ars, { uuid });

    if (cachedAr) {
      console.log("cached");
      dispatch({ type: "FETCH_AR_FULFILLED", payload: cachedAr });
    } else {
      return reserveApi({ method: "get", url: `/availability_requests/${uuid}.json` })
        .then(response => {
          if (response.data.premium === true) {
            dispatch({ type: "SET_PREMIUM" });
          }
          dispatch({ type: "FETCH_AR_FULFILLED", payload: response.data });
          dispatch(sessionCreateNoRedirect(uuid));
        })
        .catch(err => {
          dispatch({ type: "FETCH_AR_REJECTED", payload: err });
        });
    }
  };
}

export function updateAvailabilityRequestStatus(uuid, codedStatus) {
  return function(dispatch) {
    let apiValues = {};

    if (codedStatus === "c") {
      apiValues.status = "canceled";
    } else if (codedStatus === "g") {
      apiValues.status = "canceled";
      apiValues.canceled_found = true;
    } else if (codedStatus === "a") {
      apiValues.status = "active";
    }
    dispatch(updateAvailabilityRequest(uuid, apiValues));
  };
}

export function updateAvailabilityRequest(uuid, apiValues) {
  return function(dispatch) {
    dispatch({ type: "UPDATE_AR" });
    reserveApi({
      method: "put",
      url: `/availability_requests/${uuid}.json`,
      data: { availability_request: apiValues }
    })
      .then(response => {
        dispatch({ type: "FETCH_AR_FULFILLED", payload: response.data });
        dispatch({ type: "ARS_RESET" });
      })
      .catch(err => {
        dispatch({ type: "UPDATE_AR_REJECTED", payload: err });
      });
  };
}
