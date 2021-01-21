import reserveApi from '../utils/axios'
import store from "../store";

export function fetchFacility(value) {
  return dispatch => {
    dispatch({ type: 'FETCH_FACILITY' })
    return reserveApi({
      method: 'get',
      url: `/facilities/${value}.json`
    })
      .then(response => {
        dispatch({
          type: 'FETCH_FACILITY_FULFILLED',
          payload: response.data
        })
      })
      .catch(err => {
        dispatch({ type: 'FETCH_FACILITY_REJECTED', payload: err })
      })
  }
}

export function fetchFacilities(value) {
  const filters = store.getState().facilities.filter;

  return dispatch => {
    dispatch({ type: 'FETCH_FACILITIES' })
    return reserveApi({
      method: 'get',
      url: '/facilities.json',
      params: { q: value, agencyId: filters.agency?.id }
    })
      .then(response => {
        dispatch({
          type: 'FETCH_FACILITIES_FULFILLED',
          payload: response.data
        })
      })
      .catch(err => {
        dispatch({ type: 'FETCH_FACILITIES_REJECTED', payload: err })
      })
  }
}

export function fetchGroupedAvailabilities(facility_id) {
  return dispatch => {
    dispatch({ type: 'FETCH_GROUP_AVAILS' })
    return reserveApi({
      method: 'get',
      url: `/facilities/${facility_id}/availabilities.json`
    })
      .then(response => {
        dispatch({
          type: 'FETCH_GROUP_AVAILS_FULFILLED',
          payload: response.data
        })
      })
      .catch(err => {
        dispatch({ type: 'FETCH_GROUP_AVAILS_REJECTED', payload: err })
      })
  }
}

export function groupedAvailabilitiesFilterSiteType(value) {
  return dispatch => dispatch({ type: 'GROUP_AVAILS_FILTER_SITE_TYPE', payload: value })
}

export function groupedAvailabilitiesSort(value) {
  return dispatch => dispatch({ type: 'GROUP_AVAILS_SORT', payload: value })
}

export function facilityFilterAgency(agency) {
  return dispatch => {
    dispatch({ type: 'SET_FACILITY_FILTER', payload: { agency } })
    dispatch(fetchFacilities())
  }
}
