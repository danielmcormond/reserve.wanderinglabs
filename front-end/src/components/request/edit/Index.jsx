import React, { useCallback, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from 'react-redux-form'
import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'

import { matchingSiteCount } from '../../../actions/requestFormActions'
import { fetchAvailabilityRequest } from '../../../actions/availabilityRequestsActions'
import { formStepGo } from '../../../actions/requestFormActions'

import RequestForm from '../form/index'

const connected = connect(store => {
  return {
    ar: store.availabilityRequests.request,
    sites: store.availabilityRequests.sites,
    availabilityRequest: store.availabilityRequestForm,
    facilityId: store.availabilityRequestForm.facilityId
  }
})

const RequestEdit = ({ dispatch, match, ar }) => {
  useEffect(() => {
    dispatch(fetchAvailabilityRequest(match.params.uuid))
  }, [match.params.uuid])

  useEffect(() => {
    if (ar && ar.facilityId) {
      dispatch(actions.change('availabilityRequestForm.uuid', ar.uuid))
      dispatch(actions.change('availabilityRequestForm.siteIds', ar.siteIds))
      dispatch(actions.change('availabilityRequestForm.dateEnd', dayjs(ar.dateEnd).toDate()))
      dispatch(actions.change('availabilityRequestForm.dateStart', dayjs(ar.dateStart).toDate()))
      dispatch(actions.change('availabilityRequestForm.facilityId', ar.facilityId))
      dispatch(actions.change('availabilityRequestForm.facility', ar.facility))
      dispatch(actions.change('availabilityRequestForm.notifySms', ar.notifySms))
      dispatch(actions.change('availabilityRequestForm.premium', ar.premium))
      dispatch(actions.change('availabilityRequestForm.stayLength', ar.stayLength))
      dispatch(actions.change('availabilityRequestForm.specificSiteIds', ar.specificSiteIds))

      dispatch(actions.change('availabilityRequestForm.length', ar.minLength))

      // dispatch(matchingSiteCount())
      dispatch(formStepGo(2))
    }
  }, [ar])

  return (
    <div className="">
      <RequestForm />
    </div>
  )
}

export default connected(RequestEdit)
