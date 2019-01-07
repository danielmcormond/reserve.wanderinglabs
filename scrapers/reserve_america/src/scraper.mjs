import moment from 'moment';
import BluebirdPromise from 'bluebird';

import createHash from "scraper-wandering-labs-shared/src/createHash";
import NotifyComplete from "scraper-wandering-labs-shared/src/notifyComplete";
import S3 from "scraper-wandering-labs-shared/src/s3";

import Connection from './connection';
import dateRange from './utils/dateRange';
import parse from './parse';
import fromPairs from './utils/fromPairs';

export default class Scraper {
  constructor({
    facilityId, contractCode, parkId, startDate, endDate, hash, concurrency,
  }) {
    this.facilityId = facilityId;
    this.contractCode = contractCode;
    this.parkId = parkId;
    this.startDate = moment(startDate, 'MM/DD/YYYY');
    this.endDate = moment(endDate, 'MM/DD/YYYY');
    this.hash = hash;

    this.runId = moment().format('YY_MM_DD_HH_mm');
    this.concurrency = concurrency || 10;

    this.connection = new Connection(this.contractCode, this.parkId);

    this.timings = [];
  }

  get timePeriods() {
    return dateRange(this.startDate, this.endDate);
  }

  async scrape() {
    const hrstart = process.hrtime();

    const results = await BluebirdPromise.map(
      this.timePeriods,
      scrapeDate => this.scrapeParseDate(scrapeDate),
      { concurrency: this.concurrency },
    );

    const filteredResults = results.filter(result => result[1].length > 0);
    const resultsHash = fromPairs(filteredResults);

    const resultsJson = this.resultsToJson(resultsHash);
    const md5 = createHash(resultsJson);

    console.log(this.hash, md5)
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

  async scrapeParseDate(scrapeDate) {
    const scrapeResult = await this.connection.get(scrapeDate);
    const result = await parse(scrapeResult.body);
    return Promise.resolve([scrapeDate, result]);
  }

  resultsToJson(filteredResults) {
    return JSON.stringify({
      results: filteredResults,
      startDate: this.startDate.format('MM/DD/YYYY'),
      endDate: this.endDate.format('MM/DD/YYYY'),
    });
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
