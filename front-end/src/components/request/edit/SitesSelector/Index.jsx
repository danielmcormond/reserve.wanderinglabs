import React from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

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

const SitesSelector = ({ dispatch, sitesSelectorOpen }) => {
  const toggleSitesSelectorOpen = () => dispatch(siteSelectorToggle())

  return (
    <div className="border-b border-gray-400 px-1 cursor-pointer flex" onClick={() => toggleSitesSelectorOpen()}>
      <div className="flex-grow">
        <label className="filter-label inline">Select Sites</label>
        <span className="text-sm text-gray-600 md:ml-3 block md:inline">
          (Optional. Limit your request to specific sites)
        </span>
      </div>
      <div className="flex-initial">
        <FontAwesomeIcon icon={sitesSelectorOpen ? faChevronUp : faChevronDown} className="text-4xl" />
      </div>
    </div>
  )
}

export default connected(SitesSelector)
