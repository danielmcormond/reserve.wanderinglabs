import reserveApi from "../utils/axios";

export function fetchFacility(value) {
  return dispatch => {
    dispatch({ type: "FETCH_FACILITY" });
    return reserveApi({
      method: "get",
      url: `/facilities/${value}.json`
    })
      .then(response => {
        dispatch({
          type: "FETCH_FACILITY_FULFILLED",
          payload: response.data
        });
      })
      .catch(err => {
        dispatch({ type: "FETCH_FACILITY_REJECTED", payload: err });
      });
  };
}

export function fetchFacilities(value, filters = []) {
  return dispatch => {
    dispatch({ type: "FETCH_FACILITIES" });
    return reserveApi({
      method: "get",
      url: `/facilities.json?q=${value}&f=${filters}`
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
  return dispatch => {
    dispatch({ type: "FETCH_GROUP_AVAILS" });
    return reserveApi({
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
  return dispatch =>
    dispatch({ type: "GROUP_AVAILS_FILTER_SITE_TYPE", payload: value });
}

export function groupedAvailabilitiesSort(value) {
  return dispatch =>
    dispatch({ type: "GROUP_AVAILS_SORT", payload: value });
}
