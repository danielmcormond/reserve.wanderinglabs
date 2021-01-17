import React, { useCallback, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

import useToggle from '../../../hooks/useToggle'

dayjs.extend(localeData)

const connected = connect(store => {
  return {
    ar: store.availabilityRequestForm,
    sites: store.availabilityRequests.sites,
    availabilityRequest: store.availabilityRequestForm,
    facilityId: store.availabilityRequestForm.facilityId
  }
})

const SitesSelector = ({ dispatch, availabilityRequest, sites, ar }) => {
  const [specificSiteIds, setSpecificSiteIds] = useState([])
  const [siteStartsWith, setSiteStartsWith] = useState()
  const [siteInLoop, setSiteInLoop] = useState([])
  const [loopExpanded, setLoopExpanded] = useState([])

  const [sitesSelectorOpen, toggleSitesSelectorOpen] = useToggle(false)

  const toggleSite = siteId => {
    setSpecificSiteIds(
      specificSiteIds.includes(siteId)
        ? specificSiteIds.filter(d => d !== siteId)
        : specificSiteIds.concat([parseInt(siteId)])
    )
  }

  const toggleLoop = loop => {
    const siteIds = sites.filter(site => site.loop === loop).map(site => parseInt(site.id))

    setSpecificSiteIds(
      siteInLoop.includes(loop) ? specificSiteIds.filter(d => !siteIds.includes(d)) : specificSiteIds.concat(siteIds)
    )

    setSiteInLoop(siteInLoop.includes(loop) ? siteInLoop.filter(d => d !== loop) : siteInLoop.concat([loop]))
  }

  const toggleLoopExpanded = loop => {
    setLoopExpanded(loopExpanded.includes(loop) ? loopExpanded.filter(d => d !== loop) : loopExpanded.concat([loop]))
  }

  const filteredSites = useCallback(
    loop => {
      if (!siteStartsWith) {
        return sites.filter(site => site.loop === loop)
      }

      return sites.filter(
        site =>
          site.loop === loop &&
          (specificSiteIds.includes(site.id) ||
            site.siteNum.startsWith(siteStartsWith) ||
            site.siteNum.replace(/^0+/, '').startsWith(siteStartsWith))
      )
    },
    [sites, specificSiteIds, siteStartsWith]
  )

  return (
    <div className="">
      <div className="border-b border-gray-400 px-1 cursor-pointer" onClick={() => toggleSitesSelectorOpen()}>
        <label className="filter-label inline">Select Sites Sites</label>
        <span className="text-sm text-gray-600 ml-3">
          (Optional. Limit your request to specific sites)
        </span>
        <button className="float-right">
          <FontAwesomeIcon
            icon={sitesSelectorOpen ? faChevronUp : faChevronDown}
            className="text-4xl float-right pb-2"
          />
        </button>
      </div>

      <div className={`mt-3 ${sitesSelectorOpen ? '' : 'hidden'}`}>
        <div className="flex">
          <div className="flex-none w-1/3">
            <input
              className="mt-3 appearance-none border border-gray-400 rounded py-2 px-3 text-gray-700 leading-tight placeholder-opacity-50 w-3/4 bg-gray-100"
              placeholder="Filter By Site Name"
              type="text"
              onChange={e => setSiteStartsWith(e.target.value)}
            />
          </div>
        </div>

        {ar.facility.sites_details?.loops && (
          <div className={`mt-6`}>
            <div className="">
              {Object.keys(ar.facility.sites_details.loops).map(loop => (
                <div key={loop} className={`mb-6 ${filteredSites(loop).length > 0 ? '' : 'hidden'}`}>
                  <div
                    className="border-b border-gray-400 px-1 cursor-pointer"
                    onClick={() => toggleLoopExpanded(loop)}
                  >
                    <span className="text-xl mr-6">{loop}</span>
                    <span className="text-sm text-green-600">
                      {filteredSites(loop).filter(site => specificSiteIds.includes(site.id)).length}
                    </span>
                    <span className="text-sm text-gray-600"> of {filteredSites(loop).length}</span>

                    <button className="float-right">
                      <FontAwesomeIcon
                        icon={siteStartsWith || loopExpanded.includes(loop) ? faChevronUp : faChevronDown}
                        className="text-4xl float-right pb-2"
                      />
                    </button>
                  </div>

                  <div
                    className={`space-x-2-right space-y-2 ${
                      siteStartsWith || loopExpanded.includes(loop) ? '' : 'hidden'
                    }`}
                  >
                    {!siteStartsWith && (
                      <button
                        className={`${
                          siteInLoop.includes(loop) ? 'bg-green-400' : 'bg-white'
                        } items-center px-3 py-1 rounded-md border`}
                        onClick={() => toggleLoop(loop)}
                      >
                        <span className="text-sm font-bold  text-gray-700">Select All</span>
                      </button>
                    )}

                    {filteredSites(loop).map(site => (
                      <button
                        key={site.id}
                        className={`${
                          specificSiteIds.includes(site.id) ? 'bg-green-400' : 'bg-white'
                        } items-center px-3 py-1 rounded-md border`}
                        onClick={() => toggleSite(site.id)}
                      >
                        <span className="text-sm font-bold  text-gray-700">{site.siteNum}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default connected(SitesSelector)
