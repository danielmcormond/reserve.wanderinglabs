import React from 'react'

const defaultClasses = 'float-left'
const defaultActiveClass = 'bg-green-200'

const CalendarDay = ({ dayObj, day, dayPrev, dayNext }) => {
  const arrive = day.arrivable > 0
  const occupyAm = day.occupiable
  const occupyPm = arrive || (day.occupiable && dayNext.occupiable)

  return (
    <div className="calendar-day">
      <div className="px-2 whitespace-no-wrap float-right">
        <span className="text-gray-600 text-xs">
          {(dayObj.date() === 1 || dayObj.day() === 0) && dayObj.format('MMM')}
        </span>{' '}
        <span className="text-gray-600">{dayObj.format('D')}</span>
      </div>

      <div className="mt-12 mb-6 text-sm font-medium clear-both">
        <div className={`w-1/3 ${defaultClasses} ${occupyAm && defaultActiveClass} ${!occupyPm && 'rounded-r-full'}`}>
          &nbsp;
        </div>

        {arrive && (
          <div className={`w-2/3 ${defaultClasses} ${occupyAm && defaultActiveClass}`}>
            <div className="rounded-l-full day-label">
              <span className="text-white text-sm font-bold pl-3">{day.arrivable}</span>
            </div>
          </div>
        )}

        {!arrive && (
          <>
            <div className={`w-1/3 ${defaultClasses} ${occupyPm && defaultActiveClass}`}>&nbsp;</div>
            <div className={`w-1/3 ${defaultClasses} ${occupyPm && defaultActiveClass}`}>&nbsp;</div>
          </>
        )}
      </div>
    </div>
  )
}

export default CalendarDay

// departs on
// arrives on
// stay thru - circle label in middle
