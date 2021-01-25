import React, { useMemo, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import isBetween from 'dayjs/plugin/isBetween'

import { fetchAvailabilityMatchesCalendar } from '../../actions/availabilityMatchesActions'

import CalendarDay from './CalendarDay'
import CalendarGap from './CalendarGap'
import DaysOfWeek from './DaysOfWeek'
import CalendarLoading from './CalendarLoading'
import AvailabilitiesModal from './AvailabilitiesModal'

dayjs.extend(weekOfYear)
dayjs.extend(isBetween)

const Calendar = () => {
  const dispatch = useDispatch()
  const availabilityRequest = useSelector(store => store.availabilityRequests.ar)
  const availabilities = useSelector(store => store.availabilityMatches.matches)
  const calendarDays = useSelector(store => store.availabilityMatches.matchesCalendar)

  const [selectedDay, setSelectedDay] = useState()

  const startDate = useMemo(() => {
    return dayjs(availabilityRequest.date_start).startOf('week')
  }, [availabilityRequest])

  const endDate = useMemo(() => {
    return dayjs(availabilityRequest.date_end).endOf('week')
  }, [availabilityRequest])

  useEffect(() => {
    if (availabilityRequest.uuid) {
      dispatch(fetchAvailabilityMatchesCalendar(availabilityRequest.uuid))
    }
  }, [availabilityRequest])

  const selectedAvailabilities = useMemo(() => {
    if (!selectedDay) {
      console.log('no selected day')
      return []
    }
    return availabilities.filter(match => {
      const availDate = dayjs(match.avail_date)
      const isB = dayjs(selectedDay).isBetween(
        availDate,
        availDate.add(match.length - availabilityRequest.stay_length + 1, 'day'),
        null,
        '[)'
      )
      console.log({ isB, selectedDay, availDate, added: availDate.add(match.length - availabilityRequest.stay_length + 1, 'day') })
      return isB
    })
  }, [selectedDay, availabilities, availabilityRequest])

  const mappedDays = () => {
    var timePeriod = []
    var day = startDate.clone()
    let soldOutStart = startDate.clone()
    const activeWeeks = {}

    while (day <= endDate) {
      if (true || activeWeeks.indexOf(day.week()) > -1) {
        timePeriod.push(
          <CalendarDay
            key={day.format('YYYY-MM-DD')}
            dayObj={day}
            day={calendarDays[day.format('YYYY-MM-DD')] || { arrivable: 0, occupiable: false }}
            dayPrev={calendarDays[day.subtract(1, 'day').format('YYYY-MM-DD')] || { arrivable: 0, occupiable: false }}
            dayNext={calendarDays[day.add(1, 'day').format('YYYY-MM-DD')] || { arrivable: 0, occupiable: false }}
            onDayClick={setSelectedDay}
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
      {selectedDay && <AvailabilitiesModal onClose={() => setSelectedDay(null)} availabilities={selectedAvailabilities} />}
    </>
  )
}

export default Calendar
