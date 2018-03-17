import _ from 'lodash';
import moment from 'moment';
import Promise from 'bluebird';
import retry from 'bluebird-retry';
import crypto from 'crypto';

import { Connection } from './connection';
import { Parse } from './parse';
import { S3Save } from './s3_save';
import { NotifyComplete } from './notify_complete';

import Slack from './slack'

class Scraper {
  constructor(facilityId, rcPlaceId, rcFacilityId, hash) {
    this.facilityId = facilityId;
    this.rcPlaceId = rcPlaceId;
    this.rcFacilityId = rcFacilityId;
    this.hash = hash

    this.runId = moment().format('YY_MM_DD_HH_mm');
    this.concurrency = 0;

    this.connection = new Connection(this.rcPlaceId, this.rcFacilityId);
    this.timings = [];
  }

  scrape() {
    return Slack.notify(`${this.uniqKey} - Scrape Start`).then(() => {
      return this.connection.setSession().then((session) => {
        var timePeriods = [0,1,2,3,4,5,6,7,8];
        let timingsStart = +new Date();

        return Promise.mapSeries(timePeriods, (periodStart) => {
          console.log('periodStart', periodStart)
          return this.get_and_parse(periodStart); // retry(this.get_and_parse, { args: [periodStart], context: this, interval: 250 });
        }).catch((e) => {
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
    });
  }

  nextDate(iter) {
    if (iter > 0) {
      return this.connection.nextDate();
    }
    else {
      return Promise.resolve(undefined);
    }
  }

  get_and_parse(iter) {
    return this.nextDate(iter).then(() => {
      return this.connection.grid().catch((e) => {
        console.log('problem with grid');

        if (e.message === 'Error: ESOCKETTIMEDOUT') {
          console.log('TIMEOUT RETRY:');
        }
        else {
          console.log(e);
        }
        return Promise.reject(e)

      }).then((result) => {
        this.timings.push(result.elapsedTime);
        if (result.body.length === 0) {
          return Promise.reject(e)
        }
        else {
          return new Parse(result.body.d).do().then((matches) => {
            return [matches];
          });
        }
      });
    });
  }

  filter_results(results) {
    var filtered = _.flatten(_.flatten(results))
    filtered = _.uniqWith(filtered, _.isEqual);

    var correctHash = {};
    _.forEach(filtered, function(value) {
      correctHash[value[1]] = correctHash[value[1]] || [];
      correctHash[value[1]].push(value[0])
    });
    return correctHash;
  }

  results_json(filtered_results) {
    // console.log('filtered_results to json', filtered_results.length)
    let huh = JSON.stringify(filtered_results)
    // console.log('filtered_results to json', huh)
    return JSON.stringify({ results: filtered_results });
  }

  results_hash(results_json) {
    return crypto.createHash('md5').update(results_json).digest("hex");
  }

  get filename() {
    return `${this.facilityId}/${this.runId}.json`
  }

  get uniqKey() {
    return `${this.facilityId}::${this.runId}`
  }
}

export { Scraper };
