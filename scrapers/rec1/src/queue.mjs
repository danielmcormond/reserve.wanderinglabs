import { redisBrpopAsync } from 'scraper-wandering-labs-shared/src/redis';

import Scraper from './scraper';

console.log('QUEUE Start', process.env.name);

const scraperQueue = async function scraperQueue() {
  const data = await redisBrpopAsync(process.env.name, 0);

  if (data !== null) {
    const jsonData = JSON.parse(data[1]);
    try {
      const scraper = new Scraper(jsonData);
      const logMsg = await scraper.scrape();
      console.log(JSON.stringify({ ...logMsg, message: `Scrape success: ${process.env.name} / ${jsonData.name}`, scraper: process.env.name, request: jsonData }));
    } catch (err) {
      console.error(JSON.stringify({ scraper: process.env.name, message: err.message, request: jsonData }));
    }
  }
  scraperQueue();
};

scraperQueue();
