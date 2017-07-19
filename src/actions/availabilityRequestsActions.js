import _ from "lodash";

import reserveApi from "../utils/axios";
import store from "../store";

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
          dispatch({ type: "FETCH_AR_FULFILLED", payload: response.data });
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

    // TODO: CLean up
    let status = "active";
    if (codedStatus === "c") {
      status = "canceled";
    } else if (codedStatus === "a") {
      status = "active";
    }
    reserveApi({
      method: "put",
      url: `/availability_requests/${uuid}.json`,
      data: { status }
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
