import Scraper from './scraper'

const scraperQueue = async function scraperQueue() {
  // TODO: use data from Redis here instead
  const jsonData = { parkId: 12, startDate: '07/01/2021', endDate: '07/14/2021' }

  try {
    const scraper = new Scraper(jsonData)
    const logMsg = await scraper.scrape()
    console.log(JSON.stringify({ ...logMsg, message: `Scrape success: ${process.env.name} / ${jsonData.name}`, scraper: process.env.name, request: jsonData }))
  } catch (err) {
    console.error(JSON.stringify({ scraper: process.env.name, message: err.message, request: jsonData }))
  }
}

scraperQueue()
