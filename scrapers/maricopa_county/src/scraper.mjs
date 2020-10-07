import moment from "moment";
import BluebirdPromise from 'bluebird';

import createHash from "scraper-wandering-labs-shared/src/createHash";
import NotifyComplete from "scraper-wandering-labs-shared/src/notifyComplete";
import S3 from "scraper-wandering-labs-shared/src/s3";
import dateRange from "scraper-wandering-labs-shared/src/dateRange";

import Connection from "./connection";
import Parse from "./parse.mjs";

export default class Scraper {
  constructor({ facilityId, parkUrl, parkId, startDate, endDate, hash, concurrency }) {
    this.facilityId = facilityId;
    this.parkUrl = parkUrl;
    this.parkId = parkId;
    this.startDate = moment(startDate, "MM/DD/YYYY");
    this.endDate = moment(endDate, "MM/DD/YYYY");
    this.hash = hash;

    this.runId = moment().format("YY_MM_DD_HH_mm");

    this.connection = new Connection(this.parkUrl, this.parkId);
    this.concurrency = concurrency || 10;
  }

  get timePeriods() {
    return dateRange(this.startDate, this.endDate);
  }

  async scrape() {
    const hrstart = process.hrtime();

    const results = await BluebirdPromise.map(
      this.timePeriods,
      scrapeDatePage => this.scrapeParseDate(scrapeDatePage),
      { concurrency: this.concurrency },
    );
    const resultPairs = {};

    results.forEach((result) => {
      if (result.result.length > 0) {
        const dateKey = result.scrapeDate.format("MM/DD/YYYY")
        resultPairs[dateKey] = result.result
      }
    });

    console.log('resultPairs', resultPairs)
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

    return Promise.resolve({ status: "changes", timing, runId: this.runId });
  }

  async scrapeParseDate(scrapeDate) {
    console.log('scrapeDate', scrapeDate)
    const scrapeResult = await this.connection.availability(scrapeDate);
    const result = new Parse(scrapeResult.body).do();
    return Promise.resolve({ scrapeDate, result });
  }

  get filename() {
    return `${this.facilityId}/${this.runId}.json`;
  }

  get uniqKey() {
    return `${this.facilityId}::${this.runId}::${this.startDate.format(
      "MM/DD/YYYY"
    )}::${this.endDate.format("MM/DD/YYYY")}`;
  }
}
