import axios from "axios";

export function fetchAvailabilityRequests() {
  return function(dispatch) {
    dispatch({type: "FETCH_ARS"});
    axios.get("http://wl.dev/availability_requests.json")
      .then((response) => {
        dispatch({type: "FETCH_ARS_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_ARS_REJECTED", payload: err})
      })
  }
}
export function fetchAvailabilityRequest(uuid) {
  return function(dispatch) {
    // TODO: Access state availabilityRequests.ars to see if ar is already in memory.
    dispatch({type: "FETCH_AR"});
    axios.get(`http://wl.dev/availability_requests/${uuid}.json`)
      .then((response) => {
        dispatch({type: "FETCH_AR_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_AR_REJECTED", payload: err})
      })
  }
}
