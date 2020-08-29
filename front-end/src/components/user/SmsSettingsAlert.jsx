import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSms } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const SmsSettingsAlert = () => {
  return (
    <Link to="/settings" className="flex flex-row items-center bg-green-100 p-5 rounded border-t-2 border-green-300">
      <FontAwesomeIcon icon={faSms} className="flex text-5xl" />
      <div className="ml-4">
        <div className="font-semibold text-lg text-green-800">Configure your SMS Alerts!</div>
        <div className="text-sm text-green-600">
          Click to continue to the settings page where your number can be entered.
        </div>
      </div>
    </Link>
  )
}

export default SmsSettingsAlert
