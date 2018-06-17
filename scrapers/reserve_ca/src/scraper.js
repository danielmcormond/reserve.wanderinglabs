import _ from 'lodash';
import moment from 'moment';
import Promise from 'bluebird';
import retry from 'bluebird-retry';
import crypto from 'crypto';
import shortId from 'shortid';

import { Connection } from './connection';
import { Parse } from './parse';
import { S3Save } from './s3_save';
import { NotifyComplete } from './notify_complete';

class Scraper {
  constructor(params) {
    this.facilityId = params["facilityId"];
    this.rcPlaceId = params["rcPlaceId"];
    this.rcFacilityId = params["rcFacilityId"];
    this.hash = params["hash"];

    this.runId = moment().format('YY_MM_DD_HH_mm');
    this.logPrefix = `${this.facilityId}::${shortId.generate()}`
    this.concurrency = 0;

    this.connection = new Connection(this.rcPlaceId, this.rcFacilityId);
    this.timings = [];
  }

  scrape() {
    console.log(this.logPrefix, 'Scrape Start', this.runId, this.hash)
    return this.connection.setSession().then((session) => {
      var timePeriods = [0,1,2,3,4,5,6,7,8];
      let timingsStart = +new Date();

      return Promise.mapSeries(timePeriods, (periodStart) => {
        return this.get_and_parse(periodStart);
      }).then((results) => {
        let filtered_results = this.filter_results(results);
        let results_json = this.results_json(filtered_results);
        let md5 = this.results_hash(results_json);

        if (this.hash === md5) {
          console.log(this.logPrefix, 'No Differences', md5)
        }
        else {
          console.log(this.logPrefix, 'Differences', md5)
          return new S3Save(this.filename).do(results_json).then(() => {
            return new NotifyComplete(this.facilityId).post(this.runId, md5);
          });
        }
      }).catch((e) => {
        return Promise.reject(e);
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
      return this.connection.grid().then((result) => {
        if (result.body.length === 0) {
          return Promise.reject(e)
        }
        else {
          return new Parse(result.body.d).do().then((matches) => {
            return [matches];
          });
        }
      }).catch((e) => {
        console.log(this.logPrefix, iter, 'Failure', e.message);
        return Promise.reject(e)
      });
    });
  }

  filter_results(results) {
    var filtered = _.flatten(_.flatten(results))

    var correctHash = {};
    _.forEach(filtered, function(value) {
      correctHash[value[1]] = correctHash[value[1]] || [];
      if (correctHash[value[1]].includes(value[0]) !== true) {
        correctHash[value[1]].push(value[0])
      }
    });
    return correctHash;
  }

  results_json(filtered_results) {
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

export default Scraper;
