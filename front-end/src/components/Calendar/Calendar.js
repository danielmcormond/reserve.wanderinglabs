import React, { useMemo, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'

import { fetchAvailabilityMatches } from '../../actions/availabilityMatchesActions'

import CalendarDay from './CalendarDay'
import CalendarGap from './CalendarGap'
import DaysOfWeek from './DaysOfWeek'
import CalendarLoading from './CalendarLoading'

dayjs.extend(weekOfYear)

const Calendar = () => {
  const dispatch = useDispatch()
  const availabilityRequest = useSelector(store => store.availabilityRequests.ar)
  const availabilities = useSelector(store => store.availabilityMatches.matches)

  const startDate = useMemo(() => {
    return dayjs(availabilityRequest.date_start).startOf('week')
  }, [availabilityRequest])

  const endDate = useMemo(() => {
    return dayjs(availabilityRequest.date_end).endOf('week')
  }, [availabilityRequest])

  useEffect(() => {
    if (availabilityRequest.uuid) {
      dispatch(fetchAvailabilityMatches(availabilityRequest.uuid))
    }
  }, [availabilityRequest])

  const generateAvailabilityCalendar = () => {
    let activeDates = {}
    let activeWeeks = []

    availabilities.forEach(match => {
      const matchDay = dayjs(match.avail_date)
      for (let addDay = 0; addDay < match.length; addDay++) {
        const matchDayPlus = matchDay.add(addDay, 'day')
        const dayKey = matchDayPlus.format('YYYY-MM-DD')

        const arrivable = addDay < (match.length - availabilityRequest.stay_length + 1)
        const occupiable = addDay > 0

        if (activeDates[dayKey]) {
          activeDates[dayKey] = {
            arrivable: activeDates[dayKey].arrivable + (arrivable ? 1 : 0),
            occupiable: activeDates[dayKey].occupiable || occupiable
          }
        } else {
          activeDates[dayKey] = { arrivable: arrivable ? 1 : 0, occupiable }
        }
        if (arrivable || occupiable) {
          activeWeeks.push(matchDayPlus.week())
        }
      }
    })

    return { activeDates, activeWeeks }
  }

  const mappedDays = () => {
    var timePeriod = []
    var day = startDate.clone()
    let soldOutStart = startDate.clone()
    const { activeDates, activeWeeks } = generateAvailabilityCalendar()

    console.log({ activeDates, activeWeeks })
    while (day <= endDate) {
      if (activeWeeks.indexOf(day.week()) > -1) {
        timePeriod.push(
          <CalendarDay
            key={day.format('YYYY-MM-DD')}
            dayObj={day}
            day={activeDates[day.format('YYYY-MM-DD')] || { arrivable: 0, occupiable: false }}
            dayPrev={activeDates[day.subtract(1, 'day').format('YYYY-MM-DD')] || { arrivable: 0, occupiable: false }}
            dayNext={activeDates[day.add(1, 'day').format('YYYY-MM-DD')] || { arrivable: 0, occupiable: false }}
          />
        )
      } else if (day.format('YYYY-MM-DD') === endDate.format('YYYY-MM-DD')) {
        timePeriod.push(<CalendarGap key={day.format('YYYY-MM-DD')} gapStart={soldOutStart} gapEnd={day} />)
      } else if (activeWeeks.indexOf(day.clone().subtract(1, 'day').week()) > -1) {
        soldOutStart = day.clone()
      } else if (activeWeeks.indexOf(day.clone().add(1, 'day').week()) > -1) {
        timePeriod.push(<CalendarGap key={day.format('YYYY-MM-DD')} gapStart={soldOutStart} gapEnd={day} />)
      }

      day = dayjs(day).add(1, 'day')
    }
    return timePeriod
  }

  return (
    <>
      <div className="mt-4 text-right text-xs text-gray-600">
        Number of sites available for arrival on specific date are shown in the green. Lighter green bar shows the stay
        length.
      </div>
      <div className="bg-white shadow-lg rounded border-t border-l overflow-hidden mb-12">
        <div className="flex flex-wrap">
          <DaysOfWeek />
          {Object.keys(availabilities).length > 0 && mappedDays()}
          {Object.keys(availabilities).length === 0 && <CalendarLoading />}
        </div>
      </div>
    </>
  )
}

export default Calendar
