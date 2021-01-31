import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { updateAvailabilityRequestStatus } from '../../../actions/availabilityRequestsActions'

import { Button } from '../../utils/Button'
const Status = () => {
  const dispatch = useDispatch()
  const ar = useSelector(store => store.availabilityRequests.request)

  const handleStatusChange = status => {
    dispatch(updateAvailabilityRequestStatus(ar.uuid, status))
  }

  return (
    <div>
      {ar.status === 'active' && (
        <Button color="red" className="w-full" onClick={() => handleStatusChange('c')}>
          Cancel
        </Button>
      )}

      {ar.status === 'canceled' && (
        <Button color="green" className="w-full" onClick={() => handleStatusChange('a')}>
          Activate
        </Button>
      )}

      {ar.status === 'paused' && (
        <Button color="orange" className="w-full" onClick={() => handleStatusChange('a')}>
          Unpause
        </Button>
      )}
    </div>
  )
}

export default Status
