import reserveApi from "../utils/axios";

export function fetchFacilities(value) {
  return function(dispatch) {
    dispatch({ type: "FETCH_FACILITIES" });
    reserveApi({
      method: "get",
      url: `/facilities.json?q=${value}`
    })
      .then(response => {
        const mappedData = response.data.map(facility => {
          return {
            key: facility.id,
            text: facility.name,
            value: facility.id
          };
        });
        dispatch({ type: "FETCH_FACILITIES_FULFILLED", payload: mappedData });
      })
      .catch(err => {
        dispatch({ type: "FETCH_FACILITIES_REJECTED", payload: err });
      });
  };
}
