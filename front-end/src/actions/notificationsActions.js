import camelcaseKeys from 'camelcase-keys'

import reserveApi from '../utils/axios'
import store from '../store'

export function fetchNotifications(value, filters = []) {
  const uuid = store.getState().availabilityRequests.ar.uuid

  return function (dispatch) {
    dispatch({ type: 'FETCH_AR' })
    reserveApi({
      method: 'get',
      url: `/availability_requests/${uuid}/availability_notifications.json`
    })
      .then(response => {
        dispatch({
          type: 'FETCH_NOTIFICATIONS_FULFILLED',
          payload: camelcaseKeys(response.data, { deep: true })
        })
      })
      .catch(err => {
        dispatch({ type: 'FETCH_NOTIFICATIONS_REJECTED', payload: err })
      })
  }
}
