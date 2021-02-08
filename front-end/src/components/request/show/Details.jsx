import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'

import DateFormat, { dateHasPast } from '../../utils/dateFormat'
import Sites from '../Sites'
import CheckboxToggle from '../../utils/CheckboxToggleRemix'
import { updateAvailabilityRequest } from '../../../actions/availabilityRequestsActions'

const MetaWrapper = ({ children }) => <div className="">{children}</div>
const MetaHeader = ({ children }) => <div className="tracking-wide text-sm text-gray-400">{children}</div>
const MetaDetail = ({ children }) => <div className="text-xl">{children}</div>
const StatsValue = ({ children }) => <div className="text-xl md:text-3xl lg:text-4xl">{children}</div>

const Show = ({ match }) => {
  const dispatch = useDispatch()
  const ar = useSelector(store => store.availabilityRequests.request)
  const facility = useSelector(store => store.availabilityRequests.request.facility)

  const toggleSms = () =>  dispatch(updateAvailabilityRequest(ar.uuid, { notify_sms: !ar.notifySms }))

  return (
    <div className="grid grid-rows-4 grid-flow-col gap-y-2 gap-x-4">
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
        <MetaHeader>Preferences</MetaHeader>
        <MetaDetail>
          {' '}
          <CheckboxToggle label="SMS" checked={ar.notifySms} onChange={toggleSms} />
        </MetaDetail>
      </MetaWrapper>

      <MetaWrapper>
        <MetaHeader>Last Checked</MetaHeader>
        <StatsValue>
          <Link to={`/logs/${ar.facility.id}`}>
            {ar.checkedAt && <DateFormat format="M/D/YYYY hh:mm" date={ar.checkedAt} />}
            {!ar.checkedAt && <span>----</span>}

            <FontAwesomeIcon icon={faList} className="ml-4 text-gray-500 text-sm" />
          </Link>
        </StatsValue>
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
