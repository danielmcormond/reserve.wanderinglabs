import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchAvailabilityRequest } from '../../../actions/availabilityRequestsActions'
import { formStepGo } from '../../../actions/requestFormActions'
import Loading from '../../Loading'

import RequestForm from '../form/index'
import RequestFormSteps from '../form/steps'

const RequestEdit = ({ match }) => {
  const dispatch = useDispatch()
  const fetching = useSelector(store => store.availabilityRequests.fetching)
  const ar = useSelector(store => store.availabilityRequests.request)
  const currentStep = useSelector(store => store.requestForm.step)

  useEffect(() => {
    if (ar.uuid !== match.params.uuid) {
      dispatch(fetchAvailabilityRequest(match.params.uuid))
    }
  }, [match.params.uuid])

  useEffect(() => {
    if (ar && ar.facilityId) {
      if (currentStep === 1) {
        dispatch(formStepGo(2))
      }
    }
  }, [ar])

  if (fetching) {
    return <Loading />
  }

  return (
    <div className="">
      <RequestFormSteps />
      <RequestForm edit />
    </div>
  )
}

export default RequestEdit
