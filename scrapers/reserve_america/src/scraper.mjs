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
    facilityId, contractCode, parkId, startDate, endDate, hash, concurrency, numSites
  }) {
    this.facilityId = facilityId;
    this.contractCode = contractCode;
    this.parkId = parkId;
    this.startDate = moment(startDate, 'MM/DD/YYYY');
    this.endDate = moment(endDate, 'MM/DD/YYYY');
    this.hash = hash;

    this.runId = moment().format('YY_MM_DD_HH_mm');
    this.concurrency = concurrency || 10;

    this.numSites = numSites || 20;

    this.connection = new Connection(this.contractCode, this.parkId);

    this.timings = [];
  }

  get timePeriods() {
    return dateRange(this.startDate, this.endDate);
  }

  async scrape() {
    const hrstart = process.hrtime();

    await this.connection.setSession();

    const pages = parseInt(this.numSites / 50, 10) + 1;
    const timePeriodsPages = [];

    this.timePeriods.forEach((timePeriod) => {
      for (let page = 0; page < pages; page++) {
        timePeriodsPages.push([timePeriod, page]);
      }
    });

    const results = await BluebirdPromise.map(
      timePeriodsPages,
      scrapeDatePage => this.scrapeParseDate(scrapeDatePage),
      { concurrency: this.concurrency },
    );
    const resultPairs = {};

    results.forEach((result) => {
      result.forEach((availability) => {
        resultPairs[availability[1]] = resultPairs[availability[1]] || [];
        if (resultPairs[availability[1]].indexOf(availability[0]) < 0) {
          resultPairs[availability[1]].push(availability[0]);
        }
      });
    });

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

  async scrapeParseDate(scrapeDatePage) {
    const scrapeResult = await this.connection.get(scrapeDatePage[0], scrapeDatePage[1]);
    const result = parse(scrapeResult.body);
    return Promise.resolve(result);
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
