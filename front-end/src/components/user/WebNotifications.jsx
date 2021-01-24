import * as PusherPushNotifications from '@pusher/push-notifications-web'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addNotificationMethod, deleteNotificationMethod, testNotificationMethod } from '../../actions/userActions'

const WebNotifications = () => {
  const dispatch = useDispatch()
  const beamsClient = new PusherPushNotifications.Client({
    instanceId: '648dec95-3352-4ffa-97d8-6abca6416845'
  })

  const [beamLoading, setBeamLoading] = useState(true)
  const [beamStatus, setBeamStatus] = useState(false)
  const [beamLog, setBeamLog] = useState([])

  const userId = useSelector(store => store.user.user.id)
  const user = useSelector(store => store.user.user)

  const notificationMethod = useMemo(() => {
    return user.notification_methods.filter(nm => nm.notification_type === 'web')[0]
  }, [user])

  const beamInterest = useMemo(() => {
    return `debug-user-${userId}`
  }, [userId])

  const resetBeam = () => {
    beamsClient
      .start()
      .then(() => beamsClient.getDeviceInterests())
      .then(interests => {
        const userIterest = interests.filter(i => i === beamInterest)[0]
        if (userIterest) {
          setBeamStatus(true)
          setBeamLog(beamLog.concat(['Web Notifications Active!']))
        }
      })
      .then(() => setBeamLoading(false))
      .catch(e => {
        console.log('caught')
        setBeamStatus(false)
        setBeamLoading(false)
        setBeamLog(beamLog.concat(['Error - Please Re-enable Notifications']))
      })
  }

  useEffect(() => {
    if (beamsClient && notificationMethod) {
      resetBeam()
    } else {
      setBeamStatus(false)
      setBeamLoading(false)
    }
  }, [notificationMethod])

  useEffect(() => {
    if (beamStatus) {
      dispatch(addNotificationMethod('web', beamInterest))
    }
  }, [beamStatus])

  const addBeam = () => {
    beamsClient
      .start()
      .then(() => beamsClient.addDeviceInterest(beamInterest))
      .then(() => {
        setBeamLog(beamLog.concat(['Web Notifications Enabled']))
        setBeamStatus(true)
      })
  }

  const deleteBeam = () => {
    beamsClient
      .start()
      .then(() => beamsClient.removeDeviceInterest(beamInterest))
      .then(() => {
        setBeamStatus(false)
        dispatch(deleteNotificationMethod('web', notificationMethod.id))
        setBeamLog(beamLog.concat(['Notifications Disabled']))
      })
  }

  const testBeam = () => {
    dispatch(testNotificationMethod(notificationMethod.id))
    setBeamLog(beamLog.concat(['Test Notification Sent']))
  }

  return (
    <div className="">
      {beamLoading && <div className="text-sm my-4">Loading Notification Settings....</div>}
      {!beamLoading && !beamStatus && (
        <div className="prose my-4">
          Great for those spending lots of time behind a laptop. Once enabled this website does not have to remain open.
        </div>
      )}
      {!beamLoading && (
        <div className="flex space-x-2">
          {beamStatus && (
            <>
              <button className="button-flex button-gray" onClick={testBeam}>
                Test Notification
              </button>

              <button className="button-flex button-green" onClick={addBeam}>
                Refresh Setup
              </button>
              <button className="button-flex button-red" onClick={deleteBeam}>
                Disable Feature
              </button>
            </>
          )}

          {!beamStatus && (
            <>
              <button className="button-flex button-green" onClick={addBeam}>
                Enable Web Notifications
              </button>
            </>
          )}
        </div>
      )}

      <div className="flex-col-reverse flex mt-4">
        {beamLog.map((beam, i) => (
          <div key={i + beam} className="flex-grow text-gray-400">
            {beam}
          </div>
        ))}
      </div>
    </div>
  )
}

export default WebNotifications

//   const [deviceId, setDeviceId] = useState('')
// .then(beamsClient => beamsClient.getDeviceId())
// .then(deviceId => setDeviceId(deviceId))
