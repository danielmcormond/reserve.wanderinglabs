import React, { useMemo, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import isBetween from 'dayjs/plugin/isBetween'

import CalendarDay from './CalendarDay'
import CalendarGap from './CalendarGap'
import DaysOfWeek from './DaysOfWeek'
import CalendarLoading from './CalendarLoading'

dayjs.extend(weekOfYear)
dayjs.extend(isBetween)

const Calendar = () => {
  const availabilityRequest = useSelector(store => store.availabilityRequestForm)
  const activeCalendars = useSelector(store => store.calendar.active)

  const [selectedDay, setSelectedDay] = useState()

  const startDate = useMemo(() => {
    return dayjs(availabilityRequest.dateStart).startOf('week')
  }, [availabilityRequest])

  const endDate = useMemo(() => {
    return dayjs(availabilityRequest.dateEnd).endOf('week')
  }, [availabilityRequest])

  const activeWeeks = useMemo(() => {
    const activeWeeksArray = []
    activeCalendars.forEach(calendar => {
      Object.keys(calendar.availabilities).forEach(avail => {
        activeWeeksArray.push(dayjs(avail).week())
      })
    })
    return activeWeeksArray
  }, [activeCalendars])

  const mappedDays = () => {
    var timePeriod = []
    var day = startDate.clone()
    let soldOutStart = startDate.clone()

    while (day <= endDate) {
      if (activeWeeks.indexOf(day.week()) > -1) {
        timePeriod.push(<CalendarDay key={day.format('YYYY-MM-DD')} day={day} onDayClick={setSelectedDay} />)
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
      <div className="">
        {activeCalendars.map(calendar => (
          <div className="" key={calendar.id}>
            <span className={`bg-${calendar.color}-200`}>{calendar.id}</span>
            <span className="text-gray-600">{calendar.type}:</span>
            <span className="text-xl">{calendar.typeName}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 text-right text-xs text-gray-600">
        Number of sites available for arrival on specific date are shown using color. Lighter color bar shows the stay
        length.
      </div>
      <div className="bg-white shadow-lg rounded border-t border-l overflow-hidden mb-12">
        <div className="flex flex-wrap">
          <DaysOfWeek />
          {activeCalendars.length > 0 && mappedDays()}
          {activeCalendars.length === 0 && <CalendarLoading />}
        </div>
      </div>
    </>
  )
}

export default Calendar
