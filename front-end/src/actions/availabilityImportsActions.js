import reserveApi from "../utils/axios";

export function fetchAvailabilityImports(facility_id, expanded, filters = []) {
  return function(dispatch) {
    dispatch({ type: "FETCH_IMPORTS" });
    reserveApi({
      method: "get",
      url: `/availability_imports.json`,
      params: { facility_id, expanded, filters }
    })
      .then(response => {
        dispatch({ type: "FETCH_IMPORTS_FULFILLED", payload: response.data });
      })
      .catch(err => {
        dispatch({ type: "FETCH_IMPORTS_REJECTED", payload: err });
      });
  };
}
