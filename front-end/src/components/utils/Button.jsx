import React from 'react'
import clsx from 'clsx'

const buttonColors = {
  gray: 'bg-gray-100 border-gray-400 text-gray-600',
  green: 'bg-green-100 border-green-600 text-green-600',
  darkGreen: 'bg-green-500 border-green-500 text-green-100',
  red: 'bg-red-100 border-red-400 text-red-600',
  orange: 'bg-orange-100 border-orange-400 text-orange-600'
}

export const Button = ({ children, className, color, ...props }) => (
  <button {...props} className={clsx(className, buttonColors[color], 'flex-initial text-lg p-2 px-8 rounded-md border-2 font-semibold tracking-wide')}>
    {children}
  </button>
)

export const ButtonExt = ({ children, className, color, ...props }) => (
  <a {...props} className={clsx(className, buttonColors[color], 'flex-initial text-center block text-lg p-2 px-8 rounded-md border-2 font-semibold tracking-wide')}>
    {children}
  </a>
)

export default Button
