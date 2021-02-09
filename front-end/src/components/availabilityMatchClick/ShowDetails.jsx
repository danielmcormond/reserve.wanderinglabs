import React from 'react'
import { useSelector } from 'react-redux'
import clsx from 'clsx'
import Skeleton from 'react-loading-skeleton'

const MetaWrapper = ({ children }) => <div className="">{children}</div>
const MetaHeader = ({ children }) => <div className="tracking-wide text-xl text-gray-500">{children}</div>
const StatsValue = ({ children }) => <div className="text-xl md:text-4xl lg:text-5xl">{children}</div>

const Details = () => {
  const fetching = useSelector(store => store.availabilityMatches.fetching)
  const availabilityMatch = useSelector(store => store.availabilityMatches.match)

  return (
    <div className={clsx('grid grid-cols-1 gap-y-4 gap-x-4 ')}>
      <MetaWrapper>
        <MetaHeader>Site:</MetaHeader>
        <StatsValue>
          {fetching && <Skeleton width="4ch" />}
          {!fetching && availabilityMatch.site.site_num}
        </StatsValue>
      </MetaWrapper>

      <MetaWrapper>
        <MetaHeader>Arrival Date:</MetaHeader>
        <StatsValue>
          {fetching && <Skeleton width="12ch" />}
          {!fetching && availabilityMatch.avail_date}
        </StatsValue>
      </MetaWrapper>

      <MetaWrapper>
        <MetaHeader>Max Nights Avail:</MetaHeader>
        <StatsValue>
          {fetching && <Skeleton width="2ch" />}
          {!fetching && availabilityMatch.length}
        </StatsValue>
      </MetaWrapper>
    </div>
  )
}

export default Details
