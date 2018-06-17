import { Scraper } from './scraper';

require('dotenv').config({ path: __dirname + '/.env' });

exports.handler = (event, context) => {
  let params = JSON.parse(event.Records[0].Sns.Message);
  return new Scraper(params).scrape()
  .catch((e) => {
    console.log('Scrape fail...', e)
    return context.fail('Scrape failed');
  })
  .then((result) => {
    console.log('Scrape complete...')
    return context.succeed('Scrape completed');
  });
}
