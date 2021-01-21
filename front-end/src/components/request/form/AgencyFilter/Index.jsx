import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

import useToggle from '../../../../hooks/useToggle'

import AgencySelectorModal from './Modal'

const connected = connect(store => {
  return {
    agencyStore: store.agency
  }
})

const FacilityFilter = ({ dispatch, agencyStore, onFilterChange }) => {
  const [selectorOpen, toggleSelectorOpen] = useToggle(false)
  return (
    <div>
      <button onClick={() => toggleSelectorOpen()}>Filter {agencyStore.agencies.length}</button>


      {selectorOpen && <AgencySelectorModal />}
    </div>
  )
}

export default connected(FacilityFilter)
