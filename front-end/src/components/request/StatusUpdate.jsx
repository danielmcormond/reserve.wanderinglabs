import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { updateAvailabilityRequestStatus } from '../../actions/availabilityRequestsActions'

export const StatusUpdate = ({ match }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateAvailabilityRequestStatus(match.params.uuid, match.params.status))
  }, [match.params.uuid])

  return (
    <></>
  )
}

export default StatusUpdate
