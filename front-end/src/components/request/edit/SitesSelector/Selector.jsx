import React, { useCallback, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from 'react-redux-form'
import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

dayjs.extend(localeData)

const connected = connect(store => {
  return {
    ar: store.availabilityRequestForm,
    sites: store.availabilityRequests.sites,
    availabilityRequest: store.availabilityRequestForm,
    facilityId: store.availabilityRequestForm.facilityId
  }
})

const Selector = ({ dispatch, availabilityRequest, sites, ar }) => {
  const [specificSiteIds, setSpecificSiteIds] = useState(availabilityRequest.specificSiteIds || [])
  const [siteStartsWith, setSiteStartsWith] = useState()
  const [siteInLoop, setSiteInLoop] = useState([])
  const [loopExpanded, setLoopExpanded] = useState([])

  useEffect(() => {
    dispatch(actions.change('availabilityRequestForm.specificSiteIds', specificSiteIds))
  }, [specificSiteIds])

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
      <div className="flex">
        <div className="flex-none w-1/3">
          <input
            className="appearance-none border border-gray-400 rounded py-2 px-3 text-gray-700 leading-tight placeholder-opacity-50 w-full bg-gray-100"
            placeholder="Filter By Site Name"
            type="text"
            onChange={e => setSiteStartsWith(e.target.value)}
          />
        </div>
      </div>

      {ar.facility.sites_details?.loops && (
        <div className={`mt-6`}>
          <h3 className="text-xl font-semibold mb-3">Loops / Sections:</h3>
          <div className="">
            {Object.keys(ar.facility.sites_details.loops).map(loop => (
              <div key={loop} className={`mb-6 ${filteredSites(loop).length > 0 ? '' : 'hidden'}`}>
                <div
                  className="border-b border-gray-400 px-1 cursor-pointer flex"
                  onClick={() => toggleLoopExpanded(loop)}
                >
                  <div className="flex-grow">
                    <span className="text-xl mr-6">{loop}</span>
                    <span className="whitespace-nowrap">
                      <span className="text-sm text-green-600">
                        {filteredSites(loop).filter(site => specificSiteIds.includes(site.id)).length}
                      </span>
                      <span className="text-sm text-gray-600"> of {filteredSites(loop).length}</span>
                    </span>
                  </div>
                  <div className="flex-initial">
                    <FontAwesomeIcon
                      icon={siteStartsWith || loopExpanded.includes(loop) ? faChevronUp : faChevronDown}
                      className="text-4xl pb-2"
                    />
                  </div>
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
  )
}

export default connected(Selector)
