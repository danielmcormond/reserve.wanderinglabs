import React from 'react'

import { allowsNotifications } from '../../utils/notifications'

import WebNotifications from './WebNotifications'

const WebNotificationsWrapper = () => {
  return (
    <div className="flex flex-row items-center p-5 mt-5 rounded border border-b-2 border-gray-300 shadow-md mb-16">
      <div className="">
        <div className="font-semibold text-xl">Web Browser Notifications</div>
        <div className="text-lg mb-4">An experimental feature!</div>

        {!allowsNotifications() && (
          <div className="text-sm my-4">
            This browser/device does not support{' '}
            <a href="https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API/Using_the_Notifications_API#browser_compatibility">
              Notifications
            </a>
          </div>
        )}

        {allowsNotifications() && <WebNotifications />}
      </div>
    </div>
  )
}

export default WebNotificationsWrapper
