import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Transition } from '@headlessui/react'

import AgencyFilterSelect from './Select'

import { fetchAgencies } from '../../../../actions/agencyActions'

const connected = connect(store => {
  return {
    agencyStore: store.agency
  }
})

const AgencyFilterModal = ({ dispatch, agencyStore }) => {
  const handleCloseModal = () => console.log('closed')

  useEffect(() => {
    dispatch(fetchAgencies())
  }, [])


  return (
    <Transition
      show={true}
      enter="ease-out duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-75"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center">



          <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={() => handleCloseModal()}>
            <div className="absolute inset-0 bg-white opacity-95"></div>
          </div>

          <div
            className="
                inline-block
                align-bottom
                bg-white
                rounded-lg
                text-left
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
              <AgencyFilterSelect />
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:px-6 flex">
              <div className="flex-grow">

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

export default connected(AgencyFilterModal)
