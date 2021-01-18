import React from 'react'
import { connect } from 'react-redux'
import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { Transition } from '@headlessui/react'

import useToggle from '../../../../hooks/useToggle'
import { siteSelectorToggle } from '../../../../actions/requestFormActions'

dayjs.extend(localeData)

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
    <div className="">
      <div className="border-b border-gray-400 px-1 cursor-pointer" onClick={() => toggleSitesSelectorOpen()}>
        <label className="filter-label inline">Select Sites</label>
        <span className="text-sm text-gray-600 ml-3">(Optional. Limit your request to specific sites)</span>
        <button className="float-right">
          <FontAwesomeIcon
            icon={sitesSelectorOpen ? faChevronUp : faChevronDown}
            className="text-4xl float-right pb-2"
          />
        </button>
      </div>
    </div>
  )
}

export default connected(SitesSelector)
