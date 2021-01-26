import React from 'react'
import { useSelector } from 'react-redux'
import CalendarDayDetails from './CalendarDayDetails'

const CalendarDay = ({ day, onDayClick }) => {
  const activeCalendars = useSelector(store => store.calendar.active)

  const handleDayClick = () => {
    onDayClick(day)
  }

  return (
    <div className="calendar-day cursor-pointer" onClick={handleDayClick}>
      <div className="px-2 whitespace-no-wrap float-right mb-4">
        <span className="text-gray-600 text-xs">{(day.date() === 1 || day.day() === 0) && day.format('MMM')}</span>{' '}
        <span className="text-gray-600">{day.format('D')}</span>
      </div>

      {activeCalendars.map((calendar,i) => {
        const dayNow = calendar.availabilities[day.format('YYYY-MM-DD')] || { arrivable: 0, occupiable: false }
        const dayPrev = calendar.availabilities[day.subtract(1, 'day').format('YYYY-MM-DD')] || {
          arrivable: 0,
          occupiable: false
        }
        const dayNext = calendar.availabilities[day.add(1, 'day').format('YYYY-MM-DD')] || {
          arrivable: 0,
          occupiable: false
        }
        const arrive = dayNow.arrivable > 0
        const occupyAm = dayNow.occupiable && dayPrev.occupiable
        const occupyPm = arrive || (dayNow.occupiable && dayNext.occupiable)

        return (
          <CalendarDayDetails
            key={calendar.id}
            arrive={arrive}
            occupyAm={occupyAm}
            occupyPm={occupyPm}
            arrivalCount={dayNow.arrivable}
            color={calendar.color}
          />
        )
      })}
    </div>
  )
}

export default CalendarDay
