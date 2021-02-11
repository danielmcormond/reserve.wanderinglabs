import reserveApi from '../utils/axios'

export function fetchAdminAvailabilityRequestStats(value) {
  return dispatch => {
    dispatch({ type: 'ADMIN_LOADING', payload: 'AvailabilityRequestStats' })
    return reserveApi({
      method: 'get',
      url: '/admin/availability_requests.json'
    })
      .then(response => {
        dispatch({
          type: 'FETCH_ADMIN_AVAILABILITY_REQUEST_STATS_FULFILLED',
          payload: response.data
        })
      })
      .catch(err => {})
  }
}
