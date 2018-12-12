import { redisBlpopAsync } from 'scraper-wandering-labs-shared/src/redis';
import logger from 'scraper-wandering-labs-shared/src/logger';

import Scraper from './scraper';

logger.connect();

console.log('QUEUE Start', process.env.name);

const scraperQueue = async function scraperQueue() {
  const data = await redisBlpopAsync(process.env.name, 0);

  if (data !== null) {
    const jsonData = JSON.parse(data[1]);
    try {
      console.log('Start Scrape..');
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