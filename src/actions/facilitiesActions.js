import reserveApi from "../utils/axios";

export function fetchFacilities(value) {
  return function(dispatch) {
    dispatch({ type: "FETCH_FACILITIES" });
    reserveApi({
      method: "get",
      url: `/facilities.json?q=${value}`
    })
      .then(response => {
        dispatch({
          type: "FETCH_FACILITIES_FULFILLED",
          payload: response.data
        });
      })
      .catch(err => {
        dispatch({ type: "FETCH_FACILITIES_REJECTED", payload: err });
      });
  };
}

export function fetchGroupedAvailabilities(facility_id) {
  return function(dispatch) {
    dispatch({ type: "FETCH_GROUP_AVAILS" });
    reserveApi({
      method: "get",
      url: `/facilities/${facility_id}/grouped_availabilities.json`
    })
      .then(response => {
        dispatch({
          type: "FETCH_GROUP_AVAILS_FULFILLED",
          payload: response.data
        });
      })
      .catch(err => {
        dispatch({ type: "FETCH_GROUP_AVAILS_REJECTED", payload: err });
      });
  };
}

export function groupedAvailabilitiesFilterSiteType(value) {
  return function(dispatch) {
    dispatch({ type: "GROUP_AVAILS_FILTER_SITE_TYPE", payload: value });
  };
}

export function groupedAvailabilitiesSort(value) {
  console.log('VALUE', value)
  return function(dispatch) {
    dispatch({ type: "GROUP_AVAILS_SORT", payload: value });
  };
}
