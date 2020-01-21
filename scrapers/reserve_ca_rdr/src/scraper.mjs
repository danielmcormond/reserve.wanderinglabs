import moment from "moment";
import BluebirdPromise from 'bluebird';

import createHash from "scraper-wandering-labs-shared/src/createHash";
import NotifyComplete from "scraper-wandering-labs-shared/src/notifyComplete";
import S3 from "scraper-wandering-labs-shared/src/s3";

import Connection from "./connection";
import Parse from "./parse.mjs";

export default class Scraper {
  constructor({ facilityId, rcPlaceId, rcFacilityId, rcName, startDate, endDate, hash }) {
    this.facilityId = facilityId;
    this.rcPlaceId = rcPlaceId;
    this.rcFacilityId = rcFacilityId;
    this.rcName = rcName;

    this.hash = hash;

    this.startDate = moment(startDate, "MM/DD/YYYY");
    this.endDate = moment(endDate, "MM/DD/YYYY");
    this.hash = hash;

    this.runId = moment().format("YY_MM_DD_HH_mm");
    this.concurrency = 2;

    this.connection = new Connection(this.rcFacilityId);
  }

  get timePeriods() {
    const timePeriods = [];
    const day = this.startDate.clone();

    while (day <= this.endDate) {
      timePeriods.push(day.clone());
      day.add(21, 'day');
    }

    return timePeriods;
  }

  async scrape() {
    const hrstart = process.hrtime();

    console.log(this.timePeriods)
    const results = await BluebirdPromise.map(this.timePeriods, scrapeDate => this.scrapeParseDate(scrapeDate), {
      concurrency: this.concurrency
    });

    const resultPairs = {};
    results.forEach(result => {
      result.forEach(availability => {
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
      return Promise.resolve({ status: "no differences", timing });
    }
    await new S3().put({ key: this.filename, body: resultsJson });
    await new NotifyComplete(this.facilityId).post(this.runId, md5);

    const delta = process.hrtime(hrstart);
    const timing = delta[0] + delta[1] / 1e9;

    return Promise.resolve({ status: "changes", timing, runId: this.runId });
  }

  async scrapeParseDate(scrapeDate) {
    const scrapeResult = await this.connection.availability(scrapeDate);
    const results = new Parse(scrapeResult.body).do();
    return Promise.resolve(results);
  }

  get filename() {
    return `${this.facilityId}/${this.runId}.json`;
  }

  get uniqKey() {
    return `${this.facilityId}::${this.runId}::${this.startDate.format("MM/DD/YYYY")}::${this.endDate.format(
      "MM/DD/YYYY"
    )}`;
  }
}
