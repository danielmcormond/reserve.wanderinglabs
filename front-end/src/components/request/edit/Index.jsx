import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from 'react-redux-form'
import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'

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
      dispatch(actions.change('availabilityRequestForm.facilityId', ar.facilityId))

      if (currentStep === 1) {
        dispatch(formStepGo(2))
      }

      dispatch(actions.change('availabilityRequestForm.uuid', ar.uuid))
      dispatch(actions.change('availabilityRequestForm.siteIds', ar.siteIds))
      dispatch(actions.change('availabilityRequestForm.dateEnd', dayjs(ar.dateEnd).toDate()))
      dispatch(actions.change('availabilityRequestForm.dateStart', dayjs(ar.dateStart).toDate()))
      dispatch(actions.change('availabilityRequestForm.facility', ar.facility))
      dispatch(actions.change('availabilityRequestForm.notifySms', ar.notifySms))
      dispatch(actions.change('availabilityRequestForm.premium', ar.premium))
      dispatch(actions.change('availabilityRequestForm.stayLength', ar.stayLength))
      dispatch(actions.change('availabilityRequestForm.specificSiteIds', ar.specificSiteIds))
      dispatch(actions.change('availabilityRequestForm.length', ar.minLength))
      dispatch(actions.change('availabilityRequestForm.water', ar.water))
      dispatch(actions.change('availabilityRequestForm.sewer', ar.sewer))
      dispatch(actions.change('availabilityRequestForm.pullthru', ar.pullthru))
      dispatch(actions.change('availabilityRequestForm.electric', ar.minElectric.toString()))
      dispatch(actions.change('availabilityRequestForm.sitePremium', ar.sitePremium))
      dispatch(actions.change('availabilityRequestForm.ignoreAda', ar.ignoreAda))
      dispatch(actions.change('availabilityRequestForm.arrivalDays', ar.arrivalDays))
    }
  }, [ar])

  if (fetching) {
    return <Loading />
  }

  return (
    <div className="">
      <RequestFormSteps />
      <RequestForm />
    </div>
  )
}

export default RequestEdit
