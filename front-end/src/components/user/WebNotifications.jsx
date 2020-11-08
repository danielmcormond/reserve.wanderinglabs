import * as PusherPushNotifications from '@pusher/push-notifications-web'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const beamsClient = new PusherPushNotifications.Client({
  instanceId: '648dec95-3352-4ffa-97d8-6abca6416845'
})

const WebNotifications = () => {
  const [beamStatus, setBeamStatus] = useState('')
  const [deviceId, setDeviceId] = useState('')

  const userId = useSelector(store => store.user.user.id)

  useEffect(() => {
    console.log('beamit')
    beamsClient
      .start()
      .then(beamsClient => beamsClient.getDeviceId())
      .then(deviceId => setDeviceId(deviceId))
      .then(() => beamsClient.getDeviceInterests())
      .then(interests => setBeamStatus(interests))
      .catch(console.error)
  }, [])

  const addBeam = () => {
    beamsClient.start().then(() => beamsClient.addDeviceInterest(`user_${userId}`))
  }

  return (
    <div className="flex flex-row items-center bg-gray-200 p-5 mt-5 rounded border-t-2 border-gray-800">
      <div className="ml-4">
        <div className="font-semibold text-lg">Web Browser Notifications</div>
        <div className="text-sm">An experimental feature!</div>

        <div>userId: {userId}</div>
        <div>Status: {beamStatus}</div>
        <div>deviceId: {deviceId}</div>
        <button onClick={addBeam}>Allow Web Notifications</button>
      </div>
    </div>
  )
}

export default WebNotifications
