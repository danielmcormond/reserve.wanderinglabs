import reserveApi from '../utils/axios'

export function fetchAgency(value) {
  return dispatch => {
    dispatch({ type: 'FETCH_AGENCY' })
    return reserveApi({
      method: 'get',
      url: `/agencies/${value}.json`
    })
      .then(response => {
        dispatch({
          type: 'FETCH_AGENCY_FULFILLED',
          payload: response.data
        })
      })
      .catch(err => {
        dispatch({ type: 'FETCH_AGENCY_REJECTED', payload: err })
      })
  }
}

export function fetchAgencies(value, filters = []) {
  return dispatch => {
    dispatch({ type: 'FETCH_AGENCIES' })
    return reserveApi({
      method: 'get',
      url: `/agencies.json` // ?q=${value}&f=${filters}`
    })
      .then(response => {
        dispatch({
          type: 'FETCH_AGENCIES_FULFILLED',
          payload: response.data
        })
      })
      .catch(err => {
        dispatch({ type: 'FETCH_AGENCIES_REJECTED', payload: err })
      })
  }
}
