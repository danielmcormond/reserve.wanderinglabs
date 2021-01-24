import React from 'react'
import { faDesktop } from '@fortawesome/free-solid-svg-icons'

import { allowsNotifications } from '../../utils/notifications'

import WebNotifications from './WebNotifications'
import Wrapper from './Wrapper'

const WebNotificationsWrapper = () => {
  return (
    <Wrapper title="Web Browser Notifications" subTitle='An experimental feature!' icon={faDesktop}>
      {!allowsNotifications() && (
        <div className="text-sm my-4">
          This browser/device does not support{' '}
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API/Using_the_Notifications_API#browser_compatibility">
            Notifications
          </a>
        </div>
      )}

      {allowsNotifications() && <WebNotifications />}
    </Wrapper>
  )
}

export default WebNotificationsWrapper
