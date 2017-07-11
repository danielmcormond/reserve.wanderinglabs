import axios from "axios";

export function fetchAvailabilityMatches(uuid) {
  return function(dispatch) {
    // TODO: Access state availabilityRequests.ars to see if ar is already in memory.
    dispatch({type: "FETCH_MATCHES"});
    axios.get(`http://wl.dev/availability_requests/${uuid}/availability_matches.json`)
      .then((response) => {
        dispatch({type: "FETCH_MATCHES_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_MATCHES_REJECTED", payload: err})
      })
  }
}
