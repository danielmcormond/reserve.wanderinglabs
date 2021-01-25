import reserveApi from "../utils/axios";

export function fetchAvailabilityMatches(uuid) {
  return function(dispatch) {
    dispatch({ type: "FETCH_MATCHES" });
    reserveApi({
      method: "get",
      url: `/availability_requests/${uuid}/availability_matches.json`
    })
      .then(response => {
        dispatch({ type: "FETCH_MATCHES_FULFILLED", payload: response.data });
      })
      .catch(err => {
        dispatch({ type: "FETCH_MATCHES_REJECTED", payload: err });
      });
  };
}

export function fetchAvailabilityMatchesCalendar(uuid) {
  return function(dispatch) {
    dispatch({ type: "FETCH_MATCHES_CALENDAR" });
    reserveApi({
      method: "get",
      url: `/availability_requests/${uuid}/availability_matches/calendar.json`
    })
      .then(response => {
        dispatch({ type: "FETCH_MATCHES_CALENDAR_FULFILLED", payload: response.data });
      })
      .catch(err => {
        dispatch({ type: "FETCH_MATCHES_CALENDAR_REJECTED", payload: err });
      });
  };
}

export function fetchAvailabilityMatch(id, from) {
  return function(dispatch) {
    dispatch({ type: "FETCH_MATCH" });
    reserveApi({
      method: "post",
      url: `/availability_matches/${id}/click.json`,
      date: { from }
    })
      .then(response => {
        if (response.data.premium === true) {
          dispatch({ type: "SET_PREMIUM" });
        }
        dispatch({ type: "FETCH_MATCH_FULFILLED", payload: response.data });
      })
      .catch(err => {
        dispatch({ type: "FETCH_MATCH_REJECTED", payload: err });
      });
  };
}
