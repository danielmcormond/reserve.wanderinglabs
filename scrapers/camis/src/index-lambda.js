import Scraper from "./scraper.js"

exports.handler = (event, context) => {
  let params = JSON.parse(event.Records[0].Sns.Message);
  // console.log('params', params);

  return new Scraper(params).scrape()
  .catch((e) => {
    console.log('Scrape fail...')
    return context.fail('Scrape failed');
  })
  .then((result) => {
    console.log('Scrape complete...')
    return context.succeed('Scrape completed');
  });
}
