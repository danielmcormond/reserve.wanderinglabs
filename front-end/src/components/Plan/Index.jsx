import React, { useCallback, useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { actions } from 'react-redux-form'
import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'

import { calendarFacilityFetch } from '../../actions/calendarActions'

import Calendar from './Calendar/Calendar'

const COLORS = ['green', 'blue', 'red', 'yellow', 'indigo', 'pink', 'gray']

const RequestEdit = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.change('availabilityRequestForm.dateEnd', dayjs().add(365, 'day')))
    dispatch(actions.change('availabilityRequestForm.dateStart', dayjs()))
    dispatch(actions.change('availabilityRequestForm.stayLength', 5))
    dispatch(actions.change('availabilityRequestForm.type', 'rv'))
    dispatch(calendarFacilityFetch(4277, COLORS[0]))
    dispatch(calendarFacilityFetch(4276, COLORS[1]))
    dispatch(calendarFacilityFetch(4275, COLORS[2]))
    dispatch(calendarFacilityFetch(4272, COLORS[4]))
    dispatch(calendarFacilityFetch(4328, COLORS[5]))
    dispatch(calendarFacilityFetch(4281, COLORS[6]))
    dispatch(calendarFacilityFetch(4299, COLORS[3]))

  }, [])

  return (
    <div className="">
      <Calendar />
    </div>
  )
}

export default RequestEdit
