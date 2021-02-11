import React from 'react'
import { Route, Switch } from 'react-router'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import AvailabilityRequestStats from './AvailabilityRequestStats'

if (process.env.NODE_ENV === 'production') {
  require('../../tailwind.generated.css')
} else {
  require('../../tailwind.all.css')
}

export const Admin = () => {
  const token = useSelector(store => store.session.token)

  return (
    <div className="sans bg-white text-gray-700 min-h-screen">
      <div className="flex items-center justify-between h-16 bg-green-500">
        <div className="flex items-center">
          <div className="flex-shrink-0 inset-x-0 z-100 items-center pl-3">
            <h1 className="font-bold text-gray-100 text-xl inline">
              <Link to="/">Wandering Labs :: Reserve</Link>
            </h1>
          </div>
        </div>
      </div>
      <div className="container bg-green-100 min-h-screen">
        <div className={`my-1 pt-2 pb-2 px-6 flex-1 overflow-y-auto`}>
          <Switch>
            <Route path="/" component={AvailabilityRequestStats} />
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default Admin
