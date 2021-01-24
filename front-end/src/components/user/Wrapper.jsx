import React from 'react'
import classNames from 'classnames'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

const Wrapper = ({ title, subTitle, icon, children, loading }) => {
  return (
    <div className="mt-4 rounded border border-b-2 border-gray-400 shadow">
      <div className="flex items-center m-4 border-b border-gray-200">
        <div className="flex-none inline mr-4">
          <FontAwesomeIcon icon={loading ? faCircleNotch : icon} className={`text-2xl ${loading && 'animate-spin'}`} />
        </div>
        <div className="flex-1 text-xl font-semibold">
          {title}
          {subTitle && <div className="text-sm font-normal text-gray-500">{subTitle}</div>}
        </div>
      </div>
      <div className={classNames('mx-4 mb-4', loading && 'opacity-30')}>{children}</div>
    </div>
  )
}

export default Wrapper
