import _ from 'lodash';
import moment from 'moment';
import Promise from 'bluebird';
import retry from 'bluebird-retry';
import crypto from 'crypto';

import { Connection } from './connection';
import { Parse } from './parse';
import { S3Save } from './s3_save';
import { NotifyComplete } from './notify_complete';

import DateRange from './date_range.js';

import Slack from './slack'

class Scraper {
  constructor(facilityId, contractCode, parkId, startDate, endDate, hash, concurrency) {
    this.facilityId = facilityId;
    this.contractCode = contractCode;
    this.parkId = parkId;
    this.startDate = moment(startDate, 'MM/DD/YYYY');
    this.endDate = moment(endDate, 'MM/DD/YYYY');
    this.hash = hash

    this.runId = moment().format('YY_MM_DD_HH_mm');
    this.concurrency = concurrency || 10;

    this.connection = new Connection(this.contractCode);
    this.timings = [];
  }

  scrape() {
    return Slack.notify(`${this.uniqKey} - Scrape Start`).then(() => {
      var timePeriods = DateRange.getRange(this.startDate, this.endDate);
      let timingsStart = +new Date();

      return Promise.map(timePeriods, (periodStart) => {
        return retry(this.get_and_parse, { args: [periodStart], context: this, interval: 250 });
      }, { concurrency: this.concurrency }).catch((e) => {
        console.log('Promise.map catch', e)
        return Promise.reject(e);
      }).then((results) => {

        let timingsEnd = +new Date();
        let duration = timingsEnd - timingsStart;
        let logging = `\nTot: ${this.timings.length}\nDur: ${duration}\nMin: ${_.min(this.timings)}\nMax: ${_.max(this.timings)}\nMean: ${_.mean(this.timings)}\nSum: ${_.sum(this.timings)}`;

        let filtered_results = this.filter_results(results);
        let results_json = this.results_json(filtered_results);
        let md5 = this.results_hash(results_json);

        if (this.hash === md5) {
          return Slack.notify(`${this.uniqKey} - No differences - ${logging}`);
        }
        else {
          return Slack.notify(`${this.uniqKey} - Found differences - ${logging}`).then(() => {
            return new S3Save(this.filename).do(results_json).then(() => {
              return new NotifyComplete(this.facilityId).post(this.runId, md5);
            });
          });
        }
      });
    });
  }

  get_and_parse(periodStart) {
    let path = `/campsiteSearch.do?contractCode=${this.contractCode}&parkId=${this.parkId}&arvdate=${periodStart}&lengthOfStay=1&xml=true`;

    return this.connection.get(path).catch((e) => {
      console.log('problem with', path);

      if (e.message === 'Error: ESOCKETTIMEDOUT') {
        console.log('TIMEOUT RETRY:', periodStart);
      }
      else {
        console.log(e);
      }
      return Promise.reject(e)

    }).then((result) => {
      this.timings.push(result.elapsedTime);

      // console.log(result.timingPhases)
      //console.log('returned:', +new Date, result && result.statusCode, path)
      if (result.body.length === 0) {
        console.log('RUN AGAIN', periodStart)
        return Promise.reject(e)
      }
      else {
        return new Parse(result.body).do().then((matches) => {
          return [periodStart, matches]
        });
      }
    });
  }

  filter_results(results) {
    var filtered = _.pickBy(_.fromPairs(results), (v,k) => {
      return v.length > 0;
    });

    return filtered;
  }

  results_json(filtered_results) {
    return JSON.stringify({ results: filtered_results, startDate: this.startDate.format('MM/DD/YYYY'), endDate: this.endDate.format('MM/DD/YYYY') });
  }

  results_hash(results_json) {
    return crypto.createHash('md5').update(results_json).digest("hex");
  }

  get filename() {
    return `${this.facilityId}/${this.runId}.json`
  }

  get uniqKey() {
    return `${this.facilityId}::${this.runId}::${this.startDate.format('MM/DD/YYYY')}::${this.endDate.format('MM/DD/YYYY')}`
  }
}

export { Scraper };
