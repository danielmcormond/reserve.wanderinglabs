import moment from 'moment';

import createHash from 'scraper-wandering-labs-shared/src/createHash';
import NotifyComplete from 'scraper-wandering-labs-shared/src/notifyComplete';
import S3 from 'scraper-wandering-labs-shared/src/s3';

import Connection from './connection';
import Parse from './parse';

export default class Scraper {
  constructor({
    facilityId, baseUrl, mapId, startDate, endDate, hash,
  }) {
    this.facilityId = facilityId;
    this.baseUrl = baseUrl;
    this.hash = hash;
    this.startDate = moment(startDate, 'MM/DD/YYYY');
    this.endDate = moment(endDate, 'MM/DD/YYYY');
    this.mapId = mapId;

    this.runId = moment().format('YY_MM_DD_HH_mm');
    this.connection = new Connection(this.baseUrl, this.mapId);
    this.timings = [];
  }

  async scrape() {
    const hrstart = process.hrtime();
    const scrapeResult = await this.connection.availability(this.startDate, this.endDate);
    const results = await new Parse(scrapeResult.body).do(this.startDate, this.endDate);
    const resultPairs = {};

    results.forEach((availability) => {
      resultPairs[availability[1]] = resultPairs[availability[1]] || [];
      if (resultPairs[availability[1]].indexOf(availability[0]) < 0) {
        resultPairs[availability[1]].push(availability[0]);
      }
    });

    const resultsJson = `{ "results": ${JSON.stringify(
      resultPairs,
      Object.keys(resultPairs).sort(),
    )} }`;

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

    return Promise.resolve({ status: 'changes', timing, runId: this.runId });
  }

  async scrapeParseDate(scrapeDate) {
    const scrapeResult = await this.connection.nextDate(scrapeDate, 0);
    const result = await new Parse(scrapeResult.body).do();
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
