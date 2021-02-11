import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Skeleton from 'react-loading-skeleton'

import { fetchAdminAvailabilityRequestStats } from '../../actions/adminActions'

const StatWraper = ({ children }) => (
  <div className="bg-white border border-gray-400 p-4 rounded-md shadow-md">{children}</div>
)
const StatValue = ({ children }) => <span className="tracking-wide text-4xl font-bold text-gray-600">{children}</span>
const StatTitle = ({ children }) => <span className="text-lg text-gray-300 block">{children}</span>
const StatPercent = ({ children }) => <span className="text-xl text-gray-500 ml-2">{children}</span>

export const AvailabilityRequestStats = () => {
  const dispatch = useDispatch()
  const admin = useSelector(store => store.admin)

  useEffect(() => {
    dispatch(fetchAdminAvailabilityRequestStats())
  }, [])

  const stats = useMemo(
    () => [
      {
        title: 'Active Requests',
        value: admin.availabilityRequestStats?.active
      },
      {
        title: 'Active Premium',
        value: admin.availabilityRequestStats?.activePremium,
        percent: [admin.availabilityRequestStats?.activePremium, admin.availabilityRequestStats?.active]
      },
      {
        title: 'Active Users',
        value: admin.availabilityRequestStats?.activeUsers
      },
      {
        title: 'Active Premium Users',
        value: admin.availabilityRequestStats?.activePremiumUsers,
        percent: [admin.availabilityRequestStats?.activePremiumUsers, admin.availabilityRequestStats?.activeUsers]
      },
      {
        title: 'Active Matches',
        value: admin.availabilityRequestStats?.activeMatch
      },
      {
        title: 'Active Premium Matches',
        value: admin.availabilityRequestStats?.activeMatchPremium,
        percent: [admin.availabilityRequestStats?.activeMatchPremium, admin.availabilityRequestStats?.activeMatch]
      }
    ],
    [admin.availabilityRequestStats]
  )

  const percentage = p => Math.round(((p[0] || 0) / (p[1] || 1)) * 100)

  return (
    <div className="flex space-x-4">
      {stats.map(stat => (
        <StatWraper>
          <div>
            <StatValue>{stat.value || <Skeleton width="5ch" />}</StatValue>
            <StatPercent>{stat.percent && percentage(stat.percent)}{stat.percent && '%'}</StatPercent>
          </div>
          <StatTitle>{stat.title}</StatTitle>
        </StatWraper>
      ))}
    </div>
  )
}

export default AvailabilityRequestStats
