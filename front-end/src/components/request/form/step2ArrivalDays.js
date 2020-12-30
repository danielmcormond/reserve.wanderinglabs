import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from 'react-redux-form'
import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'

import useToggle from '../../../hooks/useToggle'
import CheckboxToggle from '../../utils/CheckboxToggle'

dayjs.extend(localeData)

const connected = connect(store => {
  return {
    arrivalDaysForm: store.availabilityRequestForm.arrivalDays
  }
})

const RequestFormStep2ArrivalDays = ({ dispatch, arrivalDaysForm }) => {
  const [editArrivalDays, toggleEditArrivalDays] = useToggle(true)
  const [arrivalDays, setArrivalDays] = useState(arrivalDaysForm)

  useEffect(() => {
    dispatch(actions.change('availabilityRequestForm.arrivalDays', arrivalDays))
  }, [arrivalDays])

  const toggleArrivalDay = dow => {
    if (arrivalDays.includes(dow)) {
      setArrivalDays(arrivalDays.filter(d => d !== dow))
    } else {
      setArrivalDays(arrivalDays.concat([parseInt(dow)]))
    }
  }

  return (
    <div>
      {!editArrivalDays && <button onClick={toggleEditArrivalDays}>Edit</button>}

      {editArrivalDays && (
        <div className="">
          {dayjs.weekdays().map((day, dow) => (
            <div className="inline-flex flex-1 mr-6" key={day}>
              <CheckboxToggle
                key={day}
                label={day}
                checked={arrivalDays?.includes(dow)}
                onChange={() => toggleArrivalDay(dow)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default connected(RequestFormStep2ArrivalDays)
