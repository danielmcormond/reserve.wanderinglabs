import React from 'react'
import clsx from 'clsx'

const buttonColors = {
  gray: 'bg-gray-200 border-gray-400 text-gray-600',
  green: 'bg-green-200 border-green-400 text-green-600',
  red: 'bg-red-200 border-red-400 text-red-600',
  orange: 'bg-orange-200 border-orange-400 text-orange-600'
}

export const Button = ({ children, className, color, ...props }) => (
  <button {...props} className={clsx(className, buttonColors[color], 'flex-initial text-lg p-2 rounded-md border font-semibold tracking-wide')}>
    {children}
  </button>
)

export default Button
