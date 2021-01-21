import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import ReactModal from 'react-modal'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import useToggle from '../../../../hooks/useToggle'

import AgencySelector from './Select'
import { facilityFilterAgency } from '../../../../actions/facilitiesActions'

ReactModal.setAppElement('#root')

const connected = connect(store => {
  return {
    agencyStore: store.agency,
    agencyFilter: store.facilities.filter.agency
  }
})

const FacilityFilter = ({ dispatch, agencyStore, agencyFilter }) => {
  const [selectorOpen, toggleSelectorOpen] = useToggle(false)

  const removeAgencyFilter = () => dispatch(facilityFilterAgency(null))

  return (
    <div className="flex h-full">
      {agencyFilter && (
        <button
          className="self-end mb-1 mr-4 text-sm font-light p-2 bg-green-200 border border-green-400 text-green-600 rounded-md"
          onClick={removeAgencyFilter}
        >
          <FontAwesomeIcon icon={faTimes} className="mr-2" />
          {agencyFilter?.name}
        </button>
      )}

      <button className="self-end mb-1 text-sm font-light p-2 bg-gray-200 border border-gray-400 text-gray-600 rounded-md" onClick={() => toggleSelectorOpen()}>Filter by Agency</button>

      <ReactModal
        isOpen={selectorOpen}
        onRequestClose={() => toggleSelectorOpen()}
        overlayClassName="fixed z-50 inset-0 bg-gray-500 bg-opacity-75 overflow-y-auto"
        className="flex items-end justify-center"
      >
        <div
          className="
                inline-block
                align-bottom
                bg-white
                rounded-lg
                shadow-xl
                transform
                transition-all
                mt-16
                mb-1 sm:mb-4
                sm:align-middle
                sm:max-w-2xl
                w-full
                opacity-100
              "
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-gray-50 px-4 py-3 sm:px-6 flex">
            <div className="flex-grow self-center">
              <h3 className="text-xl font-semibold text-gray-900 ">Select Agency to filter by</h3>
            </div>

            <div className="flex-initial self-center">
              <button
                className="bg-gray-700 text-white font-semibold p-1 rounded-md"
                onClick={() => toggleSelectorOpen()}
              >
                <span className="hidden md:inline">Close</span>
                <span className="inline md:hidden">Close</span>
              </button>
            </div>
          </div>

          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <AgencySelector onSelect={() => toggleSelectorOpen()} />
          </div>
        </div>{' '}
      </ReactModal>
    </div>
  )
}

export default connected(FacilityFilter)
