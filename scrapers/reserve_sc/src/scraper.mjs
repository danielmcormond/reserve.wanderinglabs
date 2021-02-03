import Connection from './connection'
import Parse from './parse'

export default class Scraper {
  constructor({ parkId, startDate }) {
    this.connection = new Connection(parkId)
    this.startDate = startDate
  }

  async scrape() {
    const scrapeResult = await this.connection.availability(this.startDate)
    const result = await new Parse(scrapeResult.data).do()
    debugger
    return result
  }
}
