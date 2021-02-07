import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { updateAvailabilityRequestStatus } from '../../../actions/availabilityRequestsActions'

import { dateHasPast } from '../../utils/dateFormat'

import { Button } from '../../utils/Button'
const Status = () => {
  const dispatch = useDispatch()
  const ar = useSelector(store => store.availabilityRequests.request)

  const handleStatusChange = status => {
    dispatch(updateAvailabilityRequestStatus(ar.uuid, status))
  }

  return (
    <>
      {dateHasPast(ar.dateEnd) && (
        <Button color="gray" className="flex-grow" onClick={() => handleStatusChange('c')}>
          Expired
        </Button>
      )}


      {!dateHasPast(ar.dateEnd) && ar.status === 'active' && (
        <Button color="red" className="flex-grow" onClick={() => handleStatusChange('c')}>
          Cancel
        </Button>
      )}

      {!dateHasPast(ar.dateEnd) && ar.status === 'canceled' && (
        <Button color="green" className="flex-grow" onClick={() => handleStatusChange('a')}>
          Activate
        </Button>
      )}

      {!dateHasPast(ar.dateEnd) && ar.status === 'paused' && (
        <Button color="orange" className="flex-grow" onClick={() => handleStatusChange('a')}>
          Unpause
        </Button>
      )}
    </>
  )
}

export default Status
