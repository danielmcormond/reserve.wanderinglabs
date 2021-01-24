import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const Add = ({ onAdd, title }) => {
  const [addValue, setAddValue] = useState('')

  const handleSubmit = () => {
    onAdd(addValue)
    setAddValue('')
  }

  return (
    <div className="flex">
      <input
        type="text"
        className="flex-1 min-w-0 appearance-none text-xl tracking-wide font-light text-gray-600 border-l border-t border-b border-gray-400 rounded-l py-2 px-2 bg-white focus:ring-2 focus:ring-green-200 ring-inset"
        onChange={e => setAddValue(e.target.value)}
        value={addValue}
      />
      <button
        onClick={handleSubmit}
        className="flex-none border rounded-r px-4 bg-green-600 border-green-600 text-green-200"
      >
        <FontAwesomeIcon icon={faPlus} className="text-2xl" />
        <span className="pl-2 text-xl hidden md:inline">{title}</span>
      </button>
    </div>
  )
}

export default Add
