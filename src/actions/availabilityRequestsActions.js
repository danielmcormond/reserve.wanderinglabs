import _ from "lodash";

import reserveApi from "../utils/axios";
import store from "../store";
import { sessionCreateNoRedirect } from "../actions/sessionActions";

export function fetchAvailabilityRequests() {
  return function(dispatch) {
    dispatch({ type: "FETCH_ARS" });
    reserveApi({ method: "get", url: "/availability_requests.json" })
      .then(response => {
        dispatch({ type: "FETCH_ARS_FULFILLED", payload: response.data });
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
      reserveApi({ method: "get", url: `/availability_requests/${uuid}.json` })
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

export function updateAvailabilityRequest(uuid, codedStatus) {
  return function(dispatch) {
    dispatch({ type: "UPDATE_AR" });

    let apiValues = {};

    // TODO: CLean up
    let status = "active";
    if (codedStatus === "c") {
      status = "canceled";
      apiValues.status = "canceled";
    } else if (codedStatus === "g") {
      status = "canceled";
      apiValues.status = "canceled";
      apiValues.canceled_found = true;
    } else if (codedStatus === "a") {
      status = "active";
      apiValues.status = "active";
    }

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
