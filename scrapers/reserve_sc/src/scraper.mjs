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
    this.concurrency = concurrency || 1
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

    // Merge all result pages and fix dates (which have no year)
    const resultPairs = results.flat().map(([date, availableSiteIds]) => {
      const resultDate = moment(date.split(' ')[1], 'MM/DD') // Example: 'Wed 02/03'
      if (resultDate.isBefore(this.startDate)) {
        resultDate.add(1, 'year')
      }
      return [resultDate.format('MM/DD/YYYY'), availableSiteIds]
    })

    const resultsJson = `{ "results": ${JSON.stringify(Object.fromEntries(resultPairs))} }`
    debugger
  }

  async scrapeParseDate(scrapeDate) {
    const scrapeResult = await this.connection.availability(scrapeDate)
    const result = await new Parse(scrapeResult.data).do()
    return result
  }
}
