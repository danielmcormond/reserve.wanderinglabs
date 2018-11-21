import React from 'react';
import moment from 'moment';

export default function DateFormat(props) {
  let cdate = moment(props.date).format(props.format)
  return(
    <time>{cdate}</time>
  )
}
