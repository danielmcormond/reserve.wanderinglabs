import moment from 'moment'
import BluebirdPromise from 'bluebird'
import merge from 'lodash.merge'

import dateRange from 'scraper-wandering-labs-shared/src/dateRange'
import Connection from './connection'
import Parse from './parse'

export default class Scraper {
  constructor({ parkId, startDate, endDate, concurrency }) {
    this.connection = new Connection(parkId)
    this.startDate = moment(startDate, 'MM/DD/YYYY')
    this.endDate = moment(endDate, 'MM/DD/YYYY')
    this.concurrency = concurrency || 2
  }

  get timePeriods() {
    return dateRange(this.startDate, this.endDate, { days: 14 })
  }

  async scrape() {
    const results = await BluebirdPromise.map(
      this.timePeriods,
      scrapeDate => this.scrapeParseDate(scrapeDate),
      { concurrency: this.concurrency }
    )

    const resultPairs = {};
    results.forEach(page => {

      // None of the response body contains the calendar year,
      // So we have to do this manually to add year to result dates
      const correctedDates = page.dates.map(date => {
        const resultDate = moment(date.split(' ')[1], 'MM/DD') // Example: 'Wed 02/03'
        if (resultDate.isBefore(this.startDate)) {
          resultDate.add(1, 'year')
        }
        return {date: resultDate.format('MM/DD/YYYY')}
      })

      const foo = page.sites.map(site => {
        merge(site.dates, correctedDates)
        const avail = []
        site.dates.forEach(date => {
          if (date.available) {
            avail.push([site.inventoryKey, date.date])
          }
        })
        return avail
      })

      debugger

    })

    // [siteId, date]
    // [248555, "05/14/2021"]
    // [248555, "05/15/2021"]
    // [248555, "05/19/2021"]
    // [248555, "05/20/2021"]
    // [248555, "05/21/2021"]

    debugger

    // '05/14/2021': [248555, 248505, 248506, 248507, 248487, 248489, 248490, 248502, 248553, 248556, 248557, 248491, 248508, 248510, 248512, 248558, 248514, 248515, 248516, 248517, 248492, 248520, 248543, 248521, 248485, 248496, 248525, 248526, 248528, 248529, 248530, 248532]
    // '05/15/2021': [248555, 248505, 248506, 248507, 248487, 248489, 248490, 248502, 248553, 248556, 248557, 248491, 248508, 248510, 248512, 248558, 248514, 248515, 248516, 248517, 248492, 248520, 248543, 248521, 248485, 248496, 248525, 248526, 248528, 248529, 248530, 248532]
    // '05/16/2021': [248505, 248506, 248507, 248487, 248488, 248489, 248490, 248502, 248553, 248556, 248557, 248491, 248508, 248510, 248512, 248558, 248515, 248516, 248517, 248518, 248519, 248492, 248493, 248520, 248543, 248521, 248547, 248522, 248494, 248523, 248504, 248485, 248496, 248525, 248526, 248528, 248529, 248530, 248531, 248532]
  }

  async scrapeParseDate(scrapeDate) {
    const scrapeResult = await this.connection.availability(scrapeDate)
    const result = await new Parse(scrapeResult.data).do()
    return result
  }
}
