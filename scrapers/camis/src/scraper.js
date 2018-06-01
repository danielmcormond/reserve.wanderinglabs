import _ from "lodash";
import moment from "moment";
import Promise from "bluebird";
import retry from "bluebird-retry";
import crypto from "crypto";

import { Connection } from "./connection";
import { Parse } from "./parse";
import { S3Save } from "./s3_save";
import { NotifyComplete } from "./notify_complete";

class Scraper {
  constructor(params) {
    this.path = params["path"];
    this.facilityId = params["facilityId"];
    this.hash = params["hash"];
    this.concurrency = params["concurrency"];
    this.runId = moment().format("YY_MM_DD_HH_mm");

    this.connection = new Connection(params["baseUrl"]);
    this.timings = [];
  }

  scrape() {
    return this.connection.detailsPage(this.path).then(session => {
      var timePeriods = [0, 1, 2, 3, 4, 5, 6, 7];
      let timingsStart = +new Date();
      console.log("timePeriods", timePeriods);

      return Promise.map(
        timePeriods,
        periodStart => {
          return retry(this.fetchAndParse, {
            args: [periodStart],
            context: this,
            interval: 250
          });
        },
        { concurrency: this.concurrency }
      )
        .catch(e => {
          console.log("Promise.map catch", e);
          return Promise.reject(e);
        })
        .then(results => {
          let timingsEnd = +new Date();
          let duration = timingsEnd - timingsStart;
          let logging = `\nTot: ${
            this.timings.length
          }\nDur: ${duration}\nMin: ${_.min(this.timings)}\nMax: ${_.max(
            this.timings
          )}\nMean: ${_.mean(this.timings)}\nSum: ${_.sum(this.timings)}`;

          let filtered_results = this.filterResults(results);
          let resultsJson = this.resultsJson(filtered_results);
          let md5 = this.results_hash(resultsJson);

          if (this.hash === md5) {
            console.log(`${this.uniqKey} - No differences - ${logging}`);
            return Promise.resolve();
          } else {
            console.log(`${this.uniqKey} - Found differences - ${logging}`);
            return new S3Save(this.filename).do(resultsJson).then(() => {
              return new NotifyComplete(this.facilityId).post(this.runId, md5);
            });
          }
        });
    });
  }

  fetchAndParse(periodStart) {
    return this.connection
      .nextDate(periodStart)
      .catch(e => {
        console.log("problem with", periodStart);

        if (e.message === "Error: ESOCKETTIMEDOUT") {
          console.log("TIMEOUT RETRY:", periodStart);
        } else {
          console.log(e);
        }
        return Promise.reject(e);
      })
      .then(result => {
        this.timings.push(result.elapsedTime);
        if (result.body.length === 0) {
          console.log("RUN AGAIN", periodStart);
          return Promise.reject(e);
        } else {
          return new Parse(result.body).do().then(matches => {
            return [matches];
          });
        }
      });
  }

  filterResults(results) {
    var filtered = _.flatten(_.flatten(results));
    filtered = _.uniqWith(filtered, _.isEqual);

    console.log("filtered", filtered.length);
    var correctHash = {};
    _.forEach(filtered, function(value) {
      correctHash[value[1]] = correctHash[value[1]] || [];
      correctHash[value[1]].push(value[0]);
    });
    return correctHash;
  }

  resultsJson(filtered_results) {
    return JSON.stringify({ results: filtered_results });
  }

  results_hash(resultsJson) {
    return crypto
      .createHash("md5")
      .update(resultsJson)
      .digest("hex");
  }

  get filename() {
    return `${this.facilityId}/${this.runId}.json`;
  }

  get uniqKey() {
    return `${this.facilityId}::${this.runId}`;
  }
}

export default Scraper;
