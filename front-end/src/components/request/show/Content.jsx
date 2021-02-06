import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import DateFormat from '../../utils/dateFormat'

import AvailabilityMatches from '../../availabilityMatches'
import Calendar from '../../Calendar/Calendar'
import Notifications from '../../Notifications/Index'

const StatsHeader = ({ children }) => <div className="text-sm text-gray-400 tracking-wide">{children}</div>
const StatsValue = ({ children }) => <div className="text-3xl">{children}</div>

const Content = ({ uuid }) => {
  const ar = useSelector(store => store.availabilityRequests.request)
  const [availabilityRequestExtra, setAvailabilityRequestExtra] = useState('matches')

  return (
    <>
      <div className="sub-nav-wrapper">
        <div className={`sub-nav ${availabilityRequestExtra === 'matches' && 'sub-nav-active'}`}>
          <span onClick={() => setAvailabilityRequestExtra('matches')}>Availabilities</span>
        </div>
        <div className={`sub-nav ${availabilityRequestExtra === 'calendar' && 'sub-nav-active'}`}>
          <span onClick={() => setAvailabilityRequestExtra('calendar')}>Calendar</span>
        </div>
        <div className={`sub-nav ${availabilityRequestExtra === 'notifications' && 'sub-nav-active'}`}>
          <span onClick={() => setAvailabilityRequestExtra('notifications')}>Notifications</span>
        </div>
      </div>

      {availabilityRequestExtra === 'matches' && <AvailabilityMatches uuid={uuid} />}
      {availabilityRequestExtra === 'calendar' && <Calendar />}
      {availabilityRequestExtra === 'notifications' && <Notifications />}
    </>
  )
}

export default Content
