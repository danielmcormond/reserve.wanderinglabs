import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBellSlash } from '@fortawesome/free-solid-svg-icons'

const OutOfOrder = ({ facility }) => {
  return (
    <div className="flex flex-row items-center bg-red-100 p-5 rounded border-t-2 border-red-800 mb-3">
      <FontAwesomeIcon icon={faBellSlash} className="flex text-5xl" />
      <div className="ml-4">
        <div className="font-semibold text-lg text-red-800">Facility Out Of Order!</div>
        <div className="pt-2 text-sm text-red-800">{facility.out_of_order_reason}</div>

        <div className="pt-2 text-sm text-red-800">
          This facility is not being polled for new availabilities.
        </div>
      </div>
    </div>
  )
}

export default OutOfOrder
