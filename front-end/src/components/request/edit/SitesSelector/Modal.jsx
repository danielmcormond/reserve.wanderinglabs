import React from 'react'
import { connect } from 'react-redux'
import { Transition } from '@headlessui/react'

import Selector from './Selector'

import { siteSelectorToggle } from '../../../../actions/requestFormActions'

const connected = connect(store => {
  return {
    sites: store.availabilityRequests.sites,
    availabilityRequest: store.availabilityRequestForm,
    facilityId: store.availabilityRequestForm.facilityId,
    sitesSelectorOpen: store.requestForm.siteSelector
  }
})

const SitesSelector = ({ dispatch, availabilityRequest, sites, sitesSelectorOpen }) => {
  const handleCloseModal = () => dispatch(siteSelectorToggle())

  return (
    <Transition
      show={sitesSelectorOpen}
      enter="ease-out duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-75"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={() => handleCloseModal()}>
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <div
            className="
                inline-block
                align-bottom
                bg-white
                rounded-lg
                text-left
                overflow-hidden
                shadow-xl
                transform
                transition-all
                mt-16
                mb-1 sm:mb-8
                sm:align-middle
                sm:max-w-2xl
                sm:w-full
              "
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="bg-gray-50 px-4 py-3 sm:px-6 flex">
              <div className="flex-grow">
                <h3 className="text-xl font-semibold text-gray-900 ">Site Specific Selections</h3>
                <h5 className="font-semibold text-gray-700 ">
                  {availabilityRequest.specificSiteIds.length > 0
                    ? `${availabilityRequest.specificSiteIds.length} sites selected.`
                    : `All ${sites.length} sites selected. Optional filtering below.`}
                </h5>
              </div>

              <button
                className="flex-initial bg-gray-700 text-white font-semibold p-3 rounded-xl"
                onClick={() => handleCloseModal()}
              >
                Save and Close
              </button>
            </div>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <Selector />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  )
}

export default connected(SitesSelector)
