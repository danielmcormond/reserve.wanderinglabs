import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faTimes } from '@fortawesome/free-solid-svg-icons'

import { addNotificationMethod, deleteNotificationMethod } from '../../actions/userActions'
import Wrapper from './Wrapper'
import Add from './Add'

const Email = () => {
  const dispatch = useDispatch()
  const user = useSelector(store => store.user.user)

  const notifications = useMemo(() => {
    return user.notification_methods.filter(nm => nm.notification_type === 'email')
  }, [user])

  const addNotification = value => {
    dispatch(addNotificationMethod('email', value))
  }

  const deleteNotification = id => {
    dispatch(deleteNotificationMethod(id))
  }

  return (
    <Wrapper title="Email Notifications" icon={faEnvelope}>
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

      <Add title="Add Email" onAdd={addNotification} />
    </Wrapper>
  )
}

export default Email
