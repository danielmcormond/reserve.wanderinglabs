import axios from "axios";

export function fetchFacilities(value) {
  return function(dispatch) {
    dispatch({type: "FETCH_FACILITIES"});
    axios.get(`http://wl.dev/facilities.json?q=${value}`)
      .then((response) => {
        const mappedData = response.data.map((facility) => {
          return {
            title: facility.name
          }
        })
        dispatch({type: "FETCH_FACILITIES_FULFILLED", payload: mappedData})
      })
      .catch((err) => {
        dispatch({type: "FETCH_FACILITIES_REJECTED", payload: err})
      })
  }
}

