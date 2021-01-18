import React from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

import { siteSelectorToggle } from '../../../../actions/requestFormActions'

const connected = connect(store => {
  return {
    ar: store.availabilityRequestForm,
    sites: store.availabilityRequests.sites,
    availabilityRequest: store.availabilityRequestForm,
    facilityId: store.availabilityRequestForm.facilityId,
    sitesSelectorOpen: store.requestForm.siteSelector
  }
})

const SitesSelector = ({ dispatch, sitesSelectorOpen, availabilityRequest }) => {
  const toggleSitesSelectorOpen = () => dispatch(siteSelectorToggle())

  return (
    <div className="border-b border-gray-400 px-1 cursor-pointer flex" onClick={() => toggleSitesSelectorOpen()}>
      <div className="flex-grow">
        <label className="filter-label inline">Select Sites</label>
        <span className="text-sm text-gray-700 md:ml-3 block md:inline">
          (Optional. Limit your request to specific sites)
        </span>
      </div>
      <div className="flex-initial self-center">
        {availabilityRequest.specificSiteIds.length > 0 && (
          <span className="font-semibold text-gray-700 px-2 py-1 bg-green-200 rounded-md">
            {availabilityRequest.specificSiteIds.length}
            <span className="hidden md:inline"> Selected</span>
          </span>
        )}

        {availabilityRequest.specificSiteIds.length === 0 && (
          <FontAwesomeIcon icon={faChevronRight} className="text-3xl" />
        )}
      </div>
    </div>
  )
}

export default connected(SitesSelector)
