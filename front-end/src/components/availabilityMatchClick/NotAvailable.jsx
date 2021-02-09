import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

import Card from '../utils/Card'
import { ButtonExt } from '../utils/Button'

dayjs.extend(localizedFormat)

export const NotAvailable = () => {
  const availabilityMatch = useSelector(store => store.availabilityMatches.match)

  return (
    <Card color="red">
      <div className="flex flex-row items-start">
        <FontAwesomeIcon icon={faExclamationTriangle} className="text-5xl mr-4" />
        <div className="prose prose-xl">
          <h3>Reserved...</h3>

          <p>A recent scan of the reservation website shows this reservation is no longer available.</p>

          <ButtonExt
            color="red"
            className="w-full"
            href={availabilityMatch.reserve.site_url}
            target="ReserveIt"
            onClick={() => {}}
          >
            Confirm on Reservation Website
          </ButtonExt>

          <p>
            According to our logs, this availability was first seen at{' '}
            <strong>{dayjs(availabilityMatch.created_at).format('LLL')}</strong> and then found unavailable at:{' '}
            <strong>{dayjs(availabilityMatch.unavailable_at).format('LLL')}</strong>.
          </p>
        </div>
      </div>
    </Card>
  )
}

export default NotAvailable
