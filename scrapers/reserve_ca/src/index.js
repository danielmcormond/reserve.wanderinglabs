import { Scraper } from './scraper';

require('dotenv').config({ path: __dirname + '/.env' });

exports.handler = (event, context) => {
  let params = JSON.parse(event.Records[0].Sns.Message);
  // console.log('params', params);


  let facilityId = params['facilityId'];
  let rcPlaceId = params['rcPlaceId'];
  let rcFacilityId = params['rcFacilityId'];

  let hash = params['hash'];

  return new Scraper(facilityId, rcPlaceId, rcFacilityId, hash).scrape()
  .catch((e) => {
    console.log('Scrape fail...', e)
    return context.fail('Scrape failed');
  })
  .then((result) => {
    console.log('Scrape complete...')
    return context.succeed('Scrape completed');
  });
}
