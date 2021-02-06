import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'

import DateFormat from '../../utils/dateFormat'
import Loading from '../../Loading'
import Button from '../../utils/Button'

import { fetchAvailabilityRequest } from '../../../actions/availabilityRequestsActions'

import Details from './Details'
import Premium from '../../user/premium.js'
import Content from './Content'

const ShowSegment = ({ className, children }) => <div className={clsx(className, 'w-full')}>{children}</div>

const Show = ({ match, ...props }) => {
  const dispatch = useDispatch()
  const fetching = useSelector(store => store.availabilityRequests.fetching)
  const ar = useSelector(store => store.availabilityRequests.request)
  const facility = useSelector(store => store.availabilityRequests.request.facility)

  useEffect(() => {
    dispatch(fetchAvailabilityRequest(match.params.uuid))
  }, [match.params.uuid])

  if (fetching) {
    return <Loading />
  }

  return (
    <>
      <div className="md:flex space-x-0 md:space-x-4">
        <ShowSegment className="md:w-2/3 lg:w-1/2">
          <div className="flex items-center mb-12 mt-4">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="flex text-4xl sm:text-6xl text-gray-500" />
            <div className="ml-4">
              <h2 className="text-lg sm:text-3xl">{facility.name}</h2>
              <h5 className="text-md sm:text-xl text-gray-500">{ar.facility.sub_name}</h5>
            </div>
          </div>

          <div className="mb-12">
            <Details />
          </div>

          <div className="flex mb-12 space-x-4">
            <Button color="green">Edit</Button>
            <Button color="green">Clone</Button>
            <Button color="red" className="flex-grow">
              Cancel
            </Button>
          </div>
        </ShowSegment>

        <ShowSegment className="md:w-1/3 lg:w-1/2">
          <Premium />
        </ShowSegment>
      </div>
      {/* <Content uuid={match.params.uuid} /> */}
    </>
  )
}

export default Show
