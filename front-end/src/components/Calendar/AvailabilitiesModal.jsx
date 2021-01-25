import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import ReactModal from 'react-modal'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import useToggle from '../../hooks/useToggle'

ReactModal.setAppElement('#root')
// ReactModal__Html--open ReactModal__Body--open
// Fool purgecss into seeing these classes.

const AvailabilitiesModal = ({ open, availabilities, onClose }) => {
  const siteDetailsClass = 'ml-4 text-sm text-gray-700'

  return (
    <>
      <ReactModal
        isOpen={true}
        onRequestClose={() => onClose()}
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
            <div className="flex-grow self-end">
              <h3 className="text-xl font-semibold text-gray-900 ">Availabilities</h3>
            </div>

            <div className="flex-initial self-end">
              <button
                className="bg-gray-700 text-white font-semibold p-1 rounded-md"
                onClick={() => onClose()}
              >
                <span className="hidden md:inline">Close</span>
                <span className="inline md:hidden">Close</span>
              </button>
            </div>
          </div>

          <div className="bg-white px-4 pt-2 pb-4 sm:pb-4">
            {availabilities.map(avail => (
              <div key={avail.id} className="border-b border-gray-500">
                <span className="text-lg">{avail.avail_date}</span>
                <span className="text-xl block">{avail.site.site_num}</span>
              </div>
            ))}
          </div>
        </div>
      </ReactModal>
    </>
  )
}

export default AvailabilitiesModal
