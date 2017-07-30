import reserveApi from "../utils/axios";

export function fetchAvailabilityImports() {
  return function(dispatch) {
    dispatch({ type: "FETCH_IMPORTS" });
    reserveApi({ method: "get", url: "/availability_imports.json" })
      .then(response => {
        dispatch({ type: "FETCH_IMPORTS_FULFILLED", payload: response.data });
      })
      .catch(err => {
        dispatch({ type: "FETCH_IMPORTS_REJECTED", payload: err });
      });
  };
}
