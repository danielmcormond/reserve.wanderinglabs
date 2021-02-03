import moment from 'moment'
import BluebirdPromise from 'bluebird'

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
    // [siteId, date]
    // [248555, '05/14/2021']
    debugger
  }

  async scrapeParseDate(scrapeDate) {
    const scrapeResult = await this.connection.availability(scrapeDate)
    const result = await new Parse(scrapeResult.data).do()
    return result
  }
}
