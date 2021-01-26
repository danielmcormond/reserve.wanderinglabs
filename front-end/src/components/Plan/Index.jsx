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
    dispatch(actions.change('availabilityRequestForm.stayLength', 1))
    dispatch(actions.change('availabilityRequestForm.type', 'rv'))
    dispatch(calendarFacilityFetch(3509, COLORS[0]))
    dispatch(calendarFacilityFetch(3516, COLORS[1]))
    dispatch(calendarFacilityFetch(3525, COLORS[2]))
    dispatch(calendarFacilityFetch(3532, COLORS[4]))
    dispatch(calendarFacilityFetch(3522, COLORS[5]))
    dispatch(calendarFacilityFetch(3543, COLORS[6]))
    dispatch(calendarFacilityFetch(3508, COLORS[3]))

  }, [])

  return (
    <div className="">
      <Calendar />
    </div>
  )
}

export default RequestEdit
