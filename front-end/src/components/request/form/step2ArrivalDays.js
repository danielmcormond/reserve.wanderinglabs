import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from 'react-redux-form'
import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretSquareDown} from '@fortawesome/free-solid-svg-icons'

import useToggle from '../../../hooks/useToggle'
import CheckboxToggle from '../../utils/CheckboxToggle'

dayjs.extend(localeData)

const connected = connect(store => {
  return {
    arrivalDaysForm: store.availabilityRequestForm.arrivalDays
  }
})

const RequestFormStep2ArrivalDays = ({ dispatch, arrivalDaysForm }) => {
  const [editArrivalDays, toggleEditArrivalDays] = useToggle(false)
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
      <label className="filter-label" onClick={toggleEditArrivalDays}>
        Only arrive on specific weekdays (optional):
        <FontAwesomeIcon icon={faCaretSquareDown} className="ml-6" />
      </label>

      {editArrivalDays && (
        <div className="shadow-md rounded-lg bg-green-200">
          {dayjs.weekdays().map((day, dow) => (
            <div className="inline-flex flex-1 pl-3 pr-3" key={day}>
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
