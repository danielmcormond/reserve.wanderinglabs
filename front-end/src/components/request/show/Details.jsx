import React, { } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

import DateFormat, { dateHasPast } from '../../utils/dateFormat'
import Sites from '../Sites'
import Status from './Status'

const MetaWrapper = ({ children }) => <div className="">{children}</div>
const MetaHeader = ({ children }) => <div className="font-bold font-sans">{children}</div>
const MetaDetail = ({ children }) => <div className="text-sm text-gray-600">{children}</div>

const Show = ({ match }) => {
  const dispatch = useDispatch()
  const ar = useSelector(store => store.availabilityRequests.request)
  const facility = useSelector(store => store.availabilityRequests.request.facility)

  return (
    <div className="grid grid-rows-4 grid-flow-col gap-y-4 ">
      <MetaWrapper>
        <MetaHeader>Arriving between</MetaHeader>
        <MetaDetail>
          <DateFormat format="MM/DD/YYYY" date={ar.dateStart} /> & <DateFormat format="MM/DD/YYYY" date={ar.dateEnd} />
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
  )
}

export default Show
