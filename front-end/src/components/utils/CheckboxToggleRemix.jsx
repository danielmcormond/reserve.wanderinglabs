import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons'

const CheckboxToggle = ({ label, checked, onChange, ...props }) => {
  return (
    <label className="flex justify-start items-center mt-2 space-x-2" onClick={onChange}>
      {!checked && <FontAwesomeIcon icon={faSquare} />}
      {checked && <FontAwesomeIcon icon={faCheckSquare} />}
      <div className="select-none sm:text-base md:text-xl font-normal">{label}</div>
    </label>
  )
}
export default CheckboxToggle
