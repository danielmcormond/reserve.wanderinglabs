import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

import Loading from '../../Loading'

import { fetchAvailabilityRequest } from '../../../actions/availabilityRequestsActions'

import AvailabilityMatches from '../../availabilityMatches'
import Calendar from '../../Calendar/Calendar'
import Notifications from '../../Notifications/Index'

import Details from './Details'
import Premium from '../../user/premium.js'

const Show = ({ match, ...props }) => {
  const dispatch = useDispatch()
  const fetching = useSelector(store => store.availabilityRequests.fetching)
  const ar = useSelector(store => store.availabilityRequests.request)
  const facility = useSelector(store => store.availabilityRequests.request.facility)

  const [availabilityRequestExtra, setAvailabilityRequestExtra] = useState('matches')

  useEffect(() => {
    dispatch(fetchAvailabilityRequest(match.params.uuid))
  }, [match.params.uuid])

  if (fetching) {
    return <Loading />
  }

  return (
    <>
      <div className="w-full md:w-1/2">
        <div className="flex items-center h-full mr-2 mb-8">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="flex text-4xl sm:text-6xl text-gray-500" />
          <div className="ml-4">
            <h2 className="text-lg sm:text-3xl">{facility.name}</h2>
            <h5 className="text-md sm:text-xl text-gray-500">{ar.facility.sub_name}</h5>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
        <Details />
        <div>
          <Premium />
        </div>
      </div>

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

      {availabilityRequestExtra === 'matches' && <AvailabilityMatches uuid={match.params.uuid} />}
      {availabilityRequestExtra === 'calendar' && <Calendar />}
      {availabilityRequestExtra === 'notifications' && <Notifications />}
    </>
  )
}

export default Show
