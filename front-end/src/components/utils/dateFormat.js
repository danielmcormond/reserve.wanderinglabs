import React from 'react';
import moment from 'moment';

const DateFormat = (props) => {
  const cdate = moment(props.date).format(props.format)
  return(
    <time>{cdate}</time>
  )
}

const dateHasPast = (date) => {
  return moment(date).isBefore();
}

export { DateFormat as default, dateHasPast }
