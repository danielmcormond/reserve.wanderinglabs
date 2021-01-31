import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import ReactModal from 'react-modal'

import useToggle from '../../hooks/useToggle'

import { fetchAvailabilitySites } from '../../actions/availabilityRequestsActions'

ReactModal.setAppElement('#root')
// ReactModal__Html--open ReactModal__Body--open
// Fool purgecss into seeing these classes.

const connected = connect(store => {
  return {
    sites: store.availabilityRequests.sites
  }
})

const Sites = ({ dispatch, sites }) => {
  const [selectorOpen, toggleSelectorOpen] = useToggle(false)

  useEffect(() => {
    if (selectorOpen) {
      dispatch(fetchAvailabilitySites())
    }
  }, [selectorOpen])

  const siteDetailsClass = 'ml-4 text-sm text-gray-700'

  return (
    <>
      <button className="ml-1 text-sm font-light text-gray-600" onClick={() => toggleSelectorOpen()}>
        (View)
      </button>

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
            <div className="flex-grow self-end">
              <h3 className="text-xl font-semibold text-gray-900 ">Sites being watched</h3>
            </div>

            <div className="flex-initial self-end">
              <button
                className="bg-gray-700 text-white font-semibold p-1 rounded-md"
                onClick={() => toggleSelectorOpen()}
              >
                <span className="hidden md:inline">Close</span>
                <span className="inline md:hidden">Close</span>
              </button>
            </div>
          </div>

          <div className="bg-white px-4 pt-2 pb-4 sm:pb-4">
            {sites.map(site => (
              <div key={site.id} className="border-b border-gray-500">
                <span className="text-lg">{site.siteNum}</span>
                {site.ada && <span className={siteDetailsClass}>ADA Restricted</span>}
                <span className={siteDetailsClass}>{site.loop}</span>
                {site.length > 0 && <span className={siteDetailsClass}>{site.length}'</span>}
                {site.electric > 0 && <span className={siteDetailsClass}>{site.electric} Amp</span>}
                {site.water && <span className={siteDetailsClass}>Water</span>}
                {site.sewer && <span className={siteDetailsClass}>Sewer</span>}
              </div>
            ))}
          </div>
        </div>
      </ReactModal>
    </>
  )
}

export default connected(Sites)
