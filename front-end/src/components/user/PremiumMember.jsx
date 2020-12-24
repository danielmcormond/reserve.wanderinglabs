import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIdBadge } from '@fortawesome/free-solid-svg-icons'

import PaypalButton from './paypal'

const PremiumMember = () => {
  const [amount, setAmount] = useState(20)

  return (
    <div className="flex flex-row items-start bg-green-100 p-5 mt-2 rounded border-t-2 border-green-300">
      <FontAwesomeIcon icon={faIdBadge} className="mt-2 text-5xl" />
      <div className="ml-4 prose prose-lg">
        <h3 className="">Premium Status: Active!</h3>

        <p>You are a premium member. Extra benefits have been activated. </p>

        <p>Has this service worked for you? Consider giving an extra thank you.</p>

        <div className="mt-3">
          <label className="inline-flex text-2xl align-top mb-2">
            <span className="leading-loose">$</span>
            <input
              className="w-1/2 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
              type="number"
              onChange={e => setAmount(parseInt(e.target.value || 0))}
              defaultValue={amount}
            />
          </label>

          <div className="inline-flex">
            <PaypalButton premiumAmount={amount} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PremiumMember
