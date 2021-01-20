import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { actions } from 'react-redux-form'

import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCampground, faCaravan, faHiking, faHouseUser, faUserFriends } from '@fortawesome/free-solid-svg-icons'

dayjs.extend(localeData)

const siteTypeOptions = [
  {
    text: 'RV Sites',
    short: 'RV Sites',
    description: "Only sites suitable for RV's",
    value: 'rv',
    values: ['rv'],
    icon: faCaravan
  },
  {
    text: 'Tent or RV',
    short: 'Tent/RV',
    description: 'You can tent in an RV site',
    value: 'rv_tent',
    values: ['rv', 'tent'],
    icon: faCampground
  },
  {
    text: 'Tents Only',
    short: 'Tents',
    description: "No RV's",
    value: 'tent',
    values: ['tent', 'tent_walk_in'],
    icon: faHiking
  },
  {
    text: 'Group Sites',
    short: 'Groups',
    description: 'You and your friends',
    value: 'group',
    values: ['group'],
    icon: faUserFriends
  },
  {
    text: 'Other',
    short: 'Other',
    description: 'Cabins, Day Use, etc',
    value: 'other',
    values: ['other'],
    icon: faHouseUser
  }
]

const connected = connect(store => {
  return {
    facility: store.availabilityRequestForm.facility,
    type: store.availabilityRequestForm.type
  }
})

const SiteType = ({ dispatch, facility, type }) => {
  const siteTypeOptionsReduced = useMemo(() => {
    if (!facility.sites_details) {
      return []
    }

    const facilitySiteTypes = Object.keys(facility.sites_details.types)

    return siteTypeOptions.filter(option => {
      const isMatch = [...new Set(facilitySiteTypes)].filter(x => new Set(option.values).has(x))
      return isMatch.length > 0
    })
  }, [facility])

  const handleTypeClick = newType => dispatch(actions.change('availabilityRequestForm.type', newType))

  return (
    <div className="flex items-stretch">
      {siteTypeOptionsReduced.map(option => (
        <div className="flex w-1/5" key={option.text}>
          <div
            className={`
              w-full rounded-lg border border-gray-500 text-center cursor-pointer text-gray-600
              p-1 sm:px-2 sm:py-3
              mr-1 md:mr-3
              ${option.value === type ? 'ring-inset ring-4 ring-green-300 bg-green-100' : ''}
            `}
            onClick={() => handleTypeClick(option.value)}
          >
            <FontAwesomeIcon icon={option.icon} className="text-xl sm:text-3xl md:text-6xl mt-1" />
            <h3 className="mt-1 md:mt-2 font-semibold tracking-tighter md:tracking-tight text-sm">
              <span className="hidden sm:inline">{option.text}</span>
              <span className="inline sm:hidden">{option.short}</span>
            </h3>
          </div>
        </div>
      ))}
    </div>
  )
}

export default connected(SiteType)
