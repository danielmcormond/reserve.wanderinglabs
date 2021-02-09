import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamation } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

import Card from '../utils/Card'

dayjs.extend(localizedFormat)

const INSTRUCTIONS = {
  'Facility::ReserveCalifornia': {
    header: 'ReserveCalifornia',
    content:
      'The new Reserve California website is not user friendly and thus we are unable to link directly to an open availability. The best we can do is a campground map. The site you are reserving should be shown on the map in green. Click to reserve. Then verify dates and stay length.'
  },
  'Facility::RecreationGovBa': {
    header: 'Reacreation.Gov',
    content:
      'After the Recreation.Gov webpage loads you will need to use the date selector to manually choose the dates.'
  }
}

export const Instructions = ({ className }) => {
  const availabilityMatch = useSelector(store => store.availabilityMatches.match)

  if (INSTRUCTIONS[availabilityMatch.facility_type] === undefined) {
    return <></>
  }

  return (
    <Card color="gray" className={className}>
      <div className="flex flex-row items-start">
        <FontAwesomeIcon icon={faExclamation} className="text-5xl mr-4" />
        <div className="prose prose-xl">
          <h3>{INSTRUCTIONS[availabilityMatch.facility_type].header}</h3>
          <p>{INSTRUCTIONS[availabilityMatch.facility_type].content}</p>
        </div>
      </div>
    </Card>
  )
}

export default Instructions
