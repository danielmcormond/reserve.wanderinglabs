import React, { useState } from 'react'
import PaypalButton from './paypal'

const amounts = [15, 20, 25, 50]

const PremiumCTA = () => {
  const [amount, setAmount] = useState(25)

  const amountChecks = amounts.map(checkAmount => {
    return (
      <label
        key={`amount_${checkAmount}`}
        className="flex flex-inline mr-6 mt-3 mb-3"
        onClick={() => setAmount(checkAmount)}
      >
        <div className="bg-white border-2 rounded border-gray-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 mt-2 focus-within:border-blue-500">
          <input type="checkbox" className="opacity-0 absolute" />
          {amount === checkAmount && (
            <svg className="fill-current w-4 h-4 text-green-500 pointer-events-none" viewBox="0 0 20 20">
              <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
            </svg>
          )}
        </div>
        <div className="select-none text-2xl">${checkAmount}</div>
      </label>
    )
  })

  return (
    <div className="flex flex-row items-start bg-green-100 p-5 mt-2 rounded border-t-2 border-green-300">
      <div className="ml-4 prose prose-lg">
        <h3 className="">Premium Membership</h3>
        <p>
          Become a premium member by sending a few bucks our way and we will upgrade your request to include these
          benefits:
        </p>

        <ul>
          <li>Check twice as often (every 3-5 minutes)</li>
          <li>No pausing (Free version pauses every week)</li>
          <li>500 Txt alerts</li>
        </ul>

        <p>Any amount will get you premium status for a year. Send what you think this service is worth.</p>

        <div className=" flex">{amountChecks}</div>
        <div className="flex">
          <PaypalButton premiumAmount={amount} />
        </div>
      </div>
    </div>
  )
}

export default PremiumCTA
