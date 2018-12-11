import { redisBlpopAsync } from './utils/redis';
import Scraper from './scraper';
import logger from './utils/logger';

logger.connect();

console.log('QUEUE Start', process.env.NODE_ENV)

const scraperQueue = async function scraperQueue() {
  const data = await redisBlpopAsync('ReserveAmerica', 0);

  if (data !== null) {
    const jsonData = JSON.parse(data[1]);
    try {
      const scraper = new Scraper(jsonData);
      const logMsg = await scraper.scrape();
      console.log({ ...logMsg, request: jsonData });
      await logger.log({ ...logMsg, request: jsonData });
    } catch (err) {
      console.log('FATAL', err);
    }
  }
  scraperQueue();
};

scraperQueue();
