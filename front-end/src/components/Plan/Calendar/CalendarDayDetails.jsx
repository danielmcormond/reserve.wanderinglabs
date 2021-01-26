import React, { useMemo } from 'react'
import classNames from 'classnames'

const defaultClasses = 'float-left'

const classColors = {
  green: {
    active: 'bg-green-200',
    label: 'day-label-green'
  },
  blue: {
    active: 'bg-blue-200',
    label: 'day-label-blue'
  },
  red: {
    active: 'bg-red-200',
    label: 'day-label-red'
  },
  yellow: {
    active: 'bg-yellow-200',
    label: 'day-label-yellow'
  },
  indigo: {
    active: 'bg-indigo-200',
    label: 'day-label-indigo'
  },
  pink: {
    active: 'bg-pink-200',
    label: 'day-label-pink'
  },
  gray: {
    active: 'bg-gray-200',
    label: 'day-label-gray'
  }
}

const CalendarDayDetails = ({ arrive, occupyAm, occupyPm, arrivalCount, color }) => {
  const defaultActiveClass = useMemo(() => classNames(classColors[color].active), [color])

  return (
    <div className="text-sm font-medium clear-both">
      <div
        className={classNames('w-1/3', defaultClasses, occupyAm && defaultActiveClass, !occupyPm && 'rounded-r-full')}
      >
        &nbsp;
      </div>

      {arrive && (
        <div className={classNames('w-2/3', defaultClasses, occupyAm && defaultActiveClass)}>
          <div className={classNames('rounded-l-full', classColors[color].label)}>
            <button className="text-white text-sm font-bold pl-3">{arrivalCount}</button>
          </div>
        </div>
      )}

      {!arrive && (
        <>
          <div className={classNames('w-1/3', defaultClasses, occupyPm && defaultActiveClass)}>&nbsp;</div>
          <div className={classNames('w-1/3', defaultClasses, occupyPm && defaultActiveClass)}>&nbsp;</div>
        </>
      )}
    </div>
  )
}

export default CalendarDayDetails
