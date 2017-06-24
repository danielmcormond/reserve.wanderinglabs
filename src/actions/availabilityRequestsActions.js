import axios from "axios";

export function fetchAvailabilityRequests() {
  return function(dispatch) {
    dispatch({type: "FETCH_AR"});
    axios.get("http://wl.dev/availability_requests.json")
      .then((response) => {
        dispatch({type: "FETCH_AR_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_AR_REJECTED", payload: err})
      })
  }
}

