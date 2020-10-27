import moment from 'moment';
import BluebirdPromise from 'bluebird';

import createHash from 'scraper-wandering-labs-shared/src/createHash';
import NotifyComplete from 'scraper-wandering-labs-shared/src/notifyComplete';
import S3 from 'scraper-wandering-labs-shared/src/s3';
import dateRange from 'scraper-wandering-labs-shared/src/dateRange';

import Connection from './connection';

import parse from './parse';
import fromPairs from './fromPairs';

export default class Scraper {
  constructor({
    facilityId, siteIds, startDate, endDate, hash, concurrency,
  }) {
    this.facilityId = facilityId;
    this.siteIds = siteIds;
    this.startDate = moment(startDate, 'MM/DD/YYYY');
    this.endDate = moment(endDate, 'MM/DD/YYYY');
    this.hash = hash;

    this.runId = moment().format('YY_MM_DD_HH_mm');
    this.concurrency = concurrency || 2;

    this.connection = new Connection(this.contractCode, this.parkId);

    this.timings = [];
  }

  get timePeriods() {
    return dateRange(this.startDate, this.endDate);
  }

  async scrape() {
    const hrstart = process.hrtime();

    const results = await this.scrapeParseDate();

    const resultPairs = {};

    results.forEach((availability) => {
      resultPairs[availability[1]] = resultPairs[availability[1]] || [];
      if (resultPairs[availability[1]].indexOf(availability[0]) < 0) {
        resultPairs[availability[1]].push(availability[0]);
      }
    });

    // console.log(resultPairs)

    const resultsJson = `{ "results": ${JSON.stringify(resultPairs, Object.keys(resultPairs).sort())} }`;

    const md5 = createHash(resultsJson);

    if (this.hash === md5) {
      const delta = process.hrtime(hrstart);
      const timing = delta[0] + delta[1] / 1e9;
      return Promise.resolve({ status: 'no differences', timing });
    }
    await new S3().put({ key: this.filename, body: resultsJson });
    await new NotifyComplete(this.facilityId).post(this.runId, md5);

    const delta = process.hrtime(hrstart);
    const timing = delta[0] + delta[1] / 1e9;

    return Promise.resolve({ status: 'changes', timing });
  }

  async scrapeParseDate() {
    const session = await this.connection.setSession();
    const sessionHash = session.body.match(/checkoutData&quot;:\{&quot;key&quot;:&quot;(.*)&quot;,&quot;cart/)
    const scrapeResult = await this.connection.post(sessionHash[1], this.startDate, this.endDate, this.siteIds);
    const result = await parse(scrapeResult.body);
    return Promise.resolve(result);
  }

  get filename() {
    return `${this.facilityId}/${this.runId}.json`;
  }

  get uniqKey() {
    return `${this.facilityId}::${this.runId}::${this.startDate.format(
      'MM/DD/YYYY',
    )}::${this.endDate.format('MM/DD/YYYY')}`;
  }
}
