import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import Skeleton from 'react-loading-skeleton'

import { ButtonExt } from '../utils/Button'

import { fetchAvailabilityMatch } from '../../actions/availabilityMatchesActions'

import Premium from '../user/premium.js'
import ShowDetails from './ShowDetails'
import NotAvailable from './NotAvailable'
import Instructions from './Instructions'

const ShowSegment = ({ className, children }) => <div className={clsx(className, 'w-full')}>{children}</div>

const Show = ({ match, ...props }) => {
  const dispatch = useDispatch()
  const fetching = useSelector(store => store.availabilityMatches.fetching)
  const availabilityMatch = useSelector(store => store.availabilityMatches.match)

  useEffect(() => {
    dispatch(fetchAvailabilityMatch(match.params.id, match.params.from))
  }, [match.params.id])

  return (
    <>
      <div className="md:flex space-x-0 md:space-x-4">
        <ShowSegment className="md:w-2/3 lg:w-1/2">
          <div className="flex items-center mt-4">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="flex text-4xl sm:text-6xl text-gray-500" />
            <div className="ml-4">
              <h2 className="text-lg sm:text-3xl">{availabilityMatch.facility || <Skeleton width="20ch" />}</h2>
              <h5 className="text-md sm:text-xl text-gray-500">
                {availabilityMatch.facility_sub_name || <Skeleton width="40ch" />}
              </h5>
            </div>
          </div>

          <div className="mt-8">
            <ShowDetails />
          </div>

          <div className={clsx('mt-12', fetching && 'hidden')}>
            {!availabilityMatch.available && <NotAvailable />}

            {availabilityMatch.available && (
              <ButtonExt
                color="green"
                className="w-full"
                href={availabilityMatch.reserve.site_url}
                target="ReserveIt"
                onClick={() => {}}
              >
                Continue to Reservation Website
              </ButtonExt>
            )}
          </div>

          <Instructions className="mt-12" />
        </ShowSegment>

        <ShowSegment className="md:w-1/3 lg:w-1/2 mt-12 md:mt-0">
          {availabilityMatch.available && <Premium />}
        </ShowSegment>
      </div>
    </>
  )
}

export default Show
