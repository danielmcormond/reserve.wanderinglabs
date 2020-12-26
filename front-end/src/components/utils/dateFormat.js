import React from 'react';
import dayjs from "dayjs"

const DateFormat = (props) => {
  const cdate = dayjs(props.date).format(props.format)
  return(
    <time>{cdate}</time>
  )
}

const dateHasPast = (date) => {
  return dayjs(date).isBefore();
}

export { DateFormat as default, dateHasPast }
