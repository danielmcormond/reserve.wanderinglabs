import reserveApi from "../utils/axios";

export function fetchFacilities(value) {
  return function(dispatch) {
    dispatch({ type: "FETCH_FACILITIES" });
    reserveApi({
      method: "get",
      url: `/facilities.json?q=${value}`
    })
      .then(response => {
        dispatch({ type: "FETCH_FACILITIES_FULFILLED", payload: response.data });
      })
      .catch(err => {
        dispatch({ type: "FETCH_FACILITIES_REJECTED", payload: err });
      });
  };
}
