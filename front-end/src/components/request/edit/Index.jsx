import React, { useCallback, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from 'react-redux-form'
import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'

import { matchingSiteCount } from '../../../actions/requestFormActions'
import { fetchAvailabilityRequest } from '../../../actions/availabilityRequestsActions'
import SiteType from './SiteType'
import SitesSelector from './SitesSelector'

import { matchingSiteCount } from '../../../actions/requestFormActions'
import { fetchAvailabilityRequest } from '../../../actions/availabilityRequestsActions'

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
      dispatch(actions.change('availabilityRequestForm.siteIds', ar.siteIds))
      dispatch(actions.change('availabilityRequestForm.dateEnd', ar.dateEnd))
      dispatch(actions.change('availabilityRequestForm.dateStart', ar.dateStart))
      dispatch(actions.change('availabilityRequestForm.facilityId', ar.facilityId))
      dispatch(actions.change('availabilityRequestForm.facility', ar.facility))
      dispatch(actions.change('availabilityRequestForm.notifySms', ar.notifySms))
      dispatch(actions.change('availabilityRequestForm.premium', ar.premium))
      dispatch(actions.change('availabilityRequestForm.stayLength', ar.stayLength))
      dispatch(actions.change('availabilityRequestForm.specificSiteIds', ar.specificSiteIds))

      dispatch(matchingSiteCount())
    }
  }, [ar])

  return (
    <div className="">
      <SiteType />
      <SitesSelector />
    </div>
  )
}

export default connected(RequestEdit)
