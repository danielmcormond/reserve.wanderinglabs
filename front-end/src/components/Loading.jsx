import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileWord } from '@fortawesome/free-solid-svg-icons'

export const Loading = () => (
  <div className="h-screen w-full flex">
    <div className="flex-grow mt-24 text-center text-gray-400">
      <FontAwesomeIcon icon={faFileWord} className="text-9xl animate-spin" />
    </div>
  </div>
)

export default Loading
