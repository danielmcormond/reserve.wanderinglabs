import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faSms, faTimes } from '@fortawesome/free-solid-svg-icons'

import { addNotificationMethod, deleteNotificationMethod } from '../../actions/userActions'
import Wrapper from './Wrapper'
import Add from './Add'

const Sms = () => {
  const dispatch = useDispatch()
  const user = useSelector(store => store.user.user)
  const notificationLoading = useSelector(store => store.user.notificationLoading)

  const notifications = useMemo(() => {
    return user.notification_methods.filter(nm => nm.notification_type === 'sms')
  }, [user])

  const addNotification = value => {
    dispatch(addNotificationMethod('sms', value))
  }

  const deleteNotification = id => {
    dispatch(deleteNotificationMethod('sms', id))
  }

  return (
    <Wrapper title="SMS/TXT Notifications" subTitle={`${user.sms_count} of ${user.sms_limit} messages used.`} icon={faSms}  loading={notificationLoading === 'sms'}>
      {notifications.map(notificationMethod => (
        <div key={notificationMethod.id} className="flex mb-3 text-xl tracking-wide font-light text-gray-600">
          <div className="flex-grow">{notificationMethod.param}</div>
          {notificationMethod.locked && <FontAwesomeIcon icon={faLock} className="text-2xl flex-none opacity-30" />}
          {!notificationMethod.locked && (
            <button onClick={() => deleteNotification(notificationMethod.id)} className="flex-none">
              <FontAwesomeIcon icon={faTimes} className="text-2xl" />
            </button>
          )}
        </div>
      ))}

      <Add title="Add SMS" onAdd={addNotification} />
    </Wrapper>
  )
}

export default Sms
