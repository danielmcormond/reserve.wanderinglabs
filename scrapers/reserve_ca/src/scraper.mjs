import moment from 'moment';
import BluebirdPromise from 'bluebird';

import createHash from 'scraper-wandering-labs-shared/src/createHash';
import NotifyComplete from 'scraper-wandering-labs-shared/src/notifyComplete';
import S3 from 'scraper-wandering-labs-shared/src/s3';

import Connection from './connection';
import Parse from './parse.mjs';

export default class Scraper {
  constructor({
    facilityId, rcPlaceId, rcFacilityId, hash, concurrency,
  }) {
    this.facilityId = facilityId;
    this.rcPlaceId = rcPlaceId;
    this.rcFacilityId = rcFacilityId;

    this.hash = hash;

    this.runId = moment().format('YY_MM_DD_HH_mm');

    this.timings = [];
    this.connection = new Connection(this.rcPlaceId, this.rcFacilityId);

    this.maxDate = moment().add(6, 'months').subtract(2, 'days');
    this.lastDate = moment();

    this.timePeriods = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  }

  async scrape() {
    const hrstart = process.hrtime();

    await this.connection.setSession();

    const results = await BluebirdPromise.mapSeries(
      this.timePeriods,
      scrapeDate => this.scrapeParseDate(scrapeDate)
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
    if (scrapeDate > 0) {
      await this.connection.nextDate();
    }

    const scrapeResult = await this.connection.grid();
    const result = await new Parse(scrapeResult.body.d).do();
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
