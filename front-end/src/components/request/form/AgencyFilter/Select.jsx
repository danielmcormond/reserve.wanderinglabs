import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchAgencies } from '../../../../actions/agencyActions'
import { facilityFilterAgency } from '../../../../actions/facilitiesActions'

const connected = connect(store => {
  return {
    agencyStore: store.agency
  }
})

const Select = ({ dispatch, agencyStore, onSelect }) => {
  useEffect(() => {
    dispatch(fetchAgencies())
  }, [])

  const handleAgencyClick = agency => {
    dispatch(facilityFilterAgency(agency))
    onSelect()
  }

  return (
    <div>
      {agencyStore.agencies.map(agency => (
        <div key={agency.id} onClick={() => handleAgencyClick(agency)} className="mb-8 cursor-pointer">
          <span className="text-2xl font-light">{agency.name}</span>
        </div>
      ))}
    </div>
  )
}

export default connected(Select)
