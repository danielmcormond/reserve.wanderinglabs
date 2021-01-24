import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'

import { fetchNotifications } from '../../actions/notificationsActions'

dayjs.extend(LocalizedFormat)

const Notifications = () => {
  const notifications = useSelector(store => store.notifications.notifications)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchNotifications())
  }, [])

  return (
    <div>
      {notifications.map(notification => (
        <div key={notification.id} className="my-4 border-b border-gray-400">
          <span className="block text-xl pb-1">{dayjs(notification.createdAt).format('LLL')}</span>
          <span className="text-gray-700">{notification.notificationMethod?.notificationType}</span>
          <span className="text-gray-700 ml-4">{notification.matches} Matches</span>
        </div>
      ))}
    </div>
  )
}

export default Notifications
