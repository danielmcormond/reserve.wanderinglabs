import moment from 'moment';

import createHash from 'scraper-wandering-labs-shared/src/createHash';
import NotifyComplete from 'scraper-wandering-labs-shared/src/notifyComplete';
import S3 from 'scraper-wandering-labs-shared/src/s3';

import Page from './page';

export default class Scraper {
  constructor({
    facilityId, rcPlaceId, rcFacilityId, rcName, hash,
  }) {
    this.facilityId = facilityId;
    this.rcPlaceId = rcPlaceId;
    this.rcFacilityId = rcFacilityId;
    this.rcName = rcName;

    this.hash = hash;

    this.dateStart = moment().add(2, 'days').format('MM/DD/YYYY');
    this.runId = moment().format('YY_MM_DD_HH_mm');
    this.page = new Page();
    this.timings = [];
  }

  async scrape() {
    const hrstart = process.hrtime();

    await this.page.launch();
    await this.page.search({ parkId: this.rcPlaceId, facilityId: this.rcFacilityId, parkName: this.rcName, arrivalDate: this.dateStart });
    await this.page.facility({ parkId: this.rcPlaceId, facilityId: this.rcFacilityId });
    await this.page.gridExpand();

    const resultPairs = await this.page.grids(this.rcFacilityId);
    this.page.close();

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
    // await new NotifyComplete(this.facilityId).post(this.runId, md5);

    const delta = process.hrtime(hrstart);
    const timing = delta[0] + delta[1] / 1e9;

    return Promise.resolve({ status: 'changes', timing, runId: this.runId });
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
