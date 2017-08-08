import { Scraper } from './scraper';

require('dotenv').config({ path: __dirname + '/.env' });

exports.handler = (event, context) => {
  let params = JSON.parse(event.Records[0].Sns.Message);
  // console.log('params', params);
  let contractCode = params['contractCode'];
  let parkId = params['parkId'];
  let startDate = params['startDate'];
  let endDate = params['endDate'];
  let facilityId = params['facilityId'];
  let hash = params['hash'];
  let concurrency = params['concurrency']

  return new Scraper(facilityId, contractCode, parkId, startDate, endDate, hash, concurrency).scrape()
  .catch((e) => {
    console.log('Scrape fail...')
    return context.fail('Scrape failed');
  })
  .then((result) => {
    console.log('Scrape complete...')
    return context.succeed('Scrape completed');
  });
}
