import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIdBadge } from '@fortawesome/free-solid-svg-icons'

import PaypalButton from './paypal'

const PremiumMember = () => {
  const [amount, setAmount] = useState(20)

  return (
    <div className=" bg-green-100 p-5 mt-2 rounded border-t-2 border-green-300">
      <div className="flex items-center mb-4">
        <FontAwesomeIcon icon={faIdBadge} className="mt-2 text-xl md:text-2xl lg:text-3xl" />
        <div className="ml-4 prose prose-lg">
          <h3 className="inline md:hidden lg:inline ">Premium Status: Active!</h3>
          <h3 className="hidden md:inline lg:hidden">Premium Active!</h3>
        </div>
      </div>
      <div className="prose prose-lg">
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
