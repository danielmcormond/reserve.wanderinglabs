import React, { useState } from 'react'
import { push } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

import Button from '../utils/Button.jsx'
import PaypalButton from '../user/paypal'

const PricingSegment = ({ className, children }) => (
  <div className={clsx(className, 'w-full md:w-1/2 lg:w-1/3 shadow-md border rounded-lg p-6')}>{children}</div>
)
const PricingHeader = ({ className, children }) => (
  <div className={clsx(className, 'text-3xl font-bold mb-4')}>{children}</div>
)

const POINTS = {
  free: ['3 Requests', 'Email Notifications', 'Paused Requests'],
  premium: ['Unlimited Requests', '250 TXT/SMS Notifications', 'Scrape Twice as Often']
}

const ListItem = ({ level }) => {
  return POINTS[level].map((item, i) => (
    <div key={i} className="text-lg">
      <FontAwesomeIcon icon={faCheck} className="mr-2" />
      {item}
    </div>
  ))
}

const amounts = [20, 25, 50]

export const PagePremium = () => {
  const dispatch = useDispatch()
  const premium = useSelector(store => store.user.premium)
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
    <div className="md:flex space-x-4">
      <PricingSegment>
        <PricingHeader>Free</PricingHeader>
        <p className="mb-4 text-lg">Try out our service for free.</p>

        <div className="mb-4">
          <ListItem level="free" />
        </div>

        <Button color="green" onClick={() => dispatch(push('/new'))}>
          Get Started Now...
        </Button>
      </PricingSegment>
      <PricingSegment>
        <PricingHeader>Premium</PricingHeader>
        <p className="mb-4"></p>
        <div className="mb-4">
          <ListItem level="premium" />
        </div>

        <p className="mb-4 text-lg">Any amount will get you premium status for a year. Send what you think this service is worth.</p>

        <div className=" flex">{amountChecks}</div>
        <div className="flex mb-4">
          <PaypalButton premiumAmount={amount} />
        </div>
      </PricingSegment>
    </div>
  )
}

export default PagePremium
