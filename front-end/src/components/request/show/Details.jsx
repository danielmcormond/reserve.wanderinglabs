import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

import DateFormat, { dateHasPast } from '../../utils/dateFormat'
import Sites from '../Sites'

const MetaWrapper = ({ children }) => <div className="">{children}</div>
const MetaHeader = ({ children }) => <div className="tracking-wide text-sm text-gray-400">{children}</div>
const MetaDetail = ({ children }) => <div className="text-xl">{children}</div>
const StatsValue = ({ children }) => <div className="text-xl md:text-3xl">{children}</div>

const Show = ({ match }) => {
  const dispatch = useDispatch()
  const ar = useSelector(store => store.availabilityRequests.request)
  const facility = useSelector(store => store.availabilityRequests.request.facility)

  return (
    <div className="grid grid-rows-3 grid-flow-col gap-y-2 gap-x-4">
      <MetaWrapper>
        <MetaHeader>Checked Count</MetaHeader>
        <StatsValue>{ar.checkedCount}</StatsValue>
      </MetaWrapper>

      <MetaWrapper>
        <MetaHeader>Arriving between</MetaHeader>
        <MetaDetail>
          <DateFormat format="MM/DD/YYYY" date={ar.dateStart} /> & <DateFormat format="MM/DD/YYYY" date={ar.dateEnd} />
        </MetaDetail>
      </MetaWrapper>

      <MetaWrapper>
        <MetaHeader>Stay Length</MetaHeader>
        <MetaDetail>{ar.stayLength}+ nights</MetaDetail>
      </MetaWrapper>

      <MetaWrapper>
        <MetaHeader>Last Checked</MetaHeader>
        <StatsValue>{ar.checkedAt && <DateFormat format="M/D/YYYY hh:mm" date={ar.checkedAt} />}</StatsValue>
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
    </div>
  )
}

export default Show

{
  /* <MetaWrapper>
<MetaHeader>Status</MetaHeader>
<MetaDetail>
  <span className="capitalize">{ar.status}</span>
</MetaDetail>
</MetaWrapper>

<Status /> */
}

// <MetaWrapper>
// <MetaHeader>Checked Count</MetaHeader>
// <MetaDetail>{ar.checkedCount}</MetaDetail>
// </MetaWrapper>

// <MetaWrapper>
// <MetaHeader>Last Checked</MetaHeader>
// <MetaDetail>
//   {ar.checked_at && <DateFormat format="M/D/YYYY hh:mm" date={ar.checkedAt} />} (
//   <Link to={`/logs/${facility.id}`}>Log</Link>)
// </MetaDetail>
// </MetaWrapper>
