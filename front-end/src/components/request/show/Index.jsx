import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

import { fetchAvailabilityRequest } from '../../../actions/availabilityRequestsActions'

import DateFormat, { dateHasPast } from '../../utils/dateFormat'
import Sites from '../Sites'
import Status from './Status'
import Premium from '../../user/premium.js'

const MetaWrapper = ({ children }) => <div className="">{children}</div>
const MetaHeader = ({ children }) => <div className="font-bold font-sans">{children}</div>
const MetaDetail = ({ children }) => <div className="text-sm text-gray-600">{children}</div>

const Show = ({ match }) => {
  const dispatch = useDispatch()
  const ar = useSelector(store => store.availabilityRequests.request)
  const facility = useSelector(store => store.availabilityRequests.request.facility)

  useEffect(() => {
    dispatch(fetchAvailabilityRequest(match.params.uuid))
  }, [match.params.uuid])

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
        <div className="grid grid-rows-4 grid-flow-col gap-y-4 ">
          <MetaWrapper>
            <MetaHeader>Arriving between</MetaHeader>
            <MetaDetail>
              <DateFormat format="MM/DD/YYYY" date={ar.dateStart} /> &{' '}
              <DateFormat format="MM/DD/YYYY" date={ar.dateEnd} />
            </MetaDetail>
          </MetaWrapper>

          <MetaWrapper>
            <MetaHeader>Stay Length</MetaHeader>
            <MetaDetail>{ar.stayLength} nights</MetaDetail>
          </MetaWrapper>

          <MetaWrapper>
            <MetaHeader>Filters</MetaHeader>
            <MetaDetail>{ar.summary}</MetaDetail>
          </MetaWrapper>

          <MetaWrapper>
            <MetaHeader>Matching Sites Count</MetaHeader>
            <MetaDetail>
              {ar.siteCount} {ar.siteCount > 0 && <Sites />}
            </MetaDetail>
          </MetaWrapper>

          <MetaWrapper>
            <MetaHeader>Status</MetaHeader>
            <MetaDetail>
              <span className="capitalize">{ar.status}</span>
            </MetaDetail>
          </MetaWrapper>

          <MetaWrapper>
            <MetaHeader>Checked Count</MetaHeader>
            <MetaDetail>{ar.checkedCount}</MetaDetail>
          </MetaWrapper>

          <MetaWrapper>
            <MetaHeader>Last Checked</MetaHeader>
            <MetaDetail>
              {ar.checked_at && <DateFormat format="M/D/YYYY hh:mm" date={ar.checkedAt} />} (
              <Link to={`/logs/${facility.id}`}>Log</Link>)
            </MetaDetail>
          </MetaWrapper>

          <Status />
        </div>
        <div>
          <Premium />
        </div>
      </div>
    </>
  )
}

export default Show
