import React, { useState } from 'react'
import { connect } from 'react-redux'
import { actions } from 'react-redux-form'
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
  const [selectorKey, setselectorKey] = useState(0)
  const handleCloseModal = () => dispatch(siteSelectorToggle())
  const resetSpecificSiteIds = () => {
    dispatch(actions.change('availabilityRequestForm.specificSiteIds', []))
    setselectorKey(selectorKey + 1)
  }

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
                mb-1 sm:mb-4
                sm:align-middle
                sm:max-w-2xl
                w-full
              "
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="bg-gray-50 px-4 py-3 sm:px-6 flex">
              <div className="flex-grow">
                <h3 className="text-xl font-semibold text-gray-900 ">Site Specific Selections</h3>
                <h5 className="font-semibold text-gray-700 ">
                  {availabilityRequest.specificSiteIds.length > 0 && (
                    <span className="">{availabilityRequest.specificSiteIds.length} sites selected.</span>
                  )}

                  {availabilityRequest.specificSiteIds.length < 1 && (
                    <>
                      <span className="">All {sites.length} sites selected. </span>
                      <span className="block md:inline">Optional filtering below.</span>
                    </>
                  )}
                </h5>
              </div>

              <div className="flex-initial self-center">
                <button
                  className="bg-gray-700 text-white font-semibold p-3 rounded-xl"
                  onClick={() => handleCloseModal()}
                >
                  <span className="hidden md:inline">Save and Close</span>
                  <span className="inline md:hidden">Save</span>
                </button>
              </div>
            </div>

            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <Selector key={selectorKey} />
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:px-6 flex">
              <div className="flex-grow">

              </div>

              <div className="flex-initial self-center mr-3">
                <button
                  className="bg-red-300 text-white font-semibold p-3 rounded-xl"
                  onClick={() => resetSpecificSiteIds()}
                >
                  <span className="hidden md:inline">Reset</span>
                  <span className="inline md:hidden">Reset</span>
                </button>
              </div>
              <div className="flex-initial self-center">
                <button
                  className="bg-gray-700 text-white font-semibold p-3 rounded-xl"
                  onClick={() => handleCloseModal()}
                >
                  <span className="hidden md:inline">Save and Close</span>
                  <span className="inline md:hidden">Save</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  )
}

export default connected(SitesSelector)
