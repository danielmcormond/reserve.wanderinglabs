import moment from 'moment';
import BluebirdPromise from 'bluebird';

import createHash from 'scraper-wandering-labs-shared/src/createHash';
import NotifyComplete from 'scraper-wandering-labs-shared/src/notifyComplete';
import S3 from 'scraper-wandering-labs-shared/src/s3';

import Connection from './connection';
import Parse from './parse';

export default class Scraper {
  constructor({
    facilityId, baseUrl, path, hash, concurrency,
  }) {
    this.path = path;
    this.facilityId = facilityId;
    this.baseUrl = baseUrl;

    // this.startDate = moment(startDate, 'MM/DD/YYYY');
    // this.endDate = moment(endDate, 'MM/DD/YYYY');
    this.hash = hash;

    this.runId = moment().format('YY_MM_DD_HH_mm');
    this.concurrency = concurrency || 10;

    this.connection = new Connection(this.baseUrl);

    this.timings = [];
    this.timePeriods = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  }

  async scrape() {
    const hrstart = process.hrtime();

    await this.connection.detailsPage(this.path);

    const results = await BluebirdPromise.map(
      this.timePeriods,
      scrapeDate => this.scrapeParseDate(scrapeDate),
      { concurrency: this.concurrency },
    );

    const resultPairs = {};
    results.forEach((result) => {
      result.forEach((availability) => {
        resultPairs[availability[1]] = resultPairs[availability[1]] || [];

        // Remove duplicates // Camis calendar overlaps 2 days each page view
        if (resultPairs[availability[1]].indexOf(availability[0]) < 0) {
          resultPairs[availability[1]].push(availability[0]);
        }
      });
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
    const scrapeResult = await this.connection.nextDate(scrapeDate);
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
