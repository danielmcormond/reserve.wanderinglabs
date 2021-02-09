import React from 'react'
import clsx from 'clsx'

const Colors = {
  gray: 'bg-gray-100 border-gray-400',
  green: 'bg-green-100 border-green-400',
  darkGreen: 'bg-green-500 border-green-500 text-green-100',
  red: 'bg-red-100 border-red-400 text-gray-600',
  orange: 'bg-orange-200 border-orange-400 text-orange-600'
}

export const Card = ({ children, className, color = 'green', ...props }) => (
  <div {...props} className={clsx(className, Colors[color], 'p-4 rounded border-t-2 shadow-sm')}>
    {children}
  </div>
)

export default Card
