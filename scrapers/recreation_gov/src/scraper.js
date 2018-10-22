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
    this.rgFacilityId = params["rgFacilityId"];
    this.hash = params["hash"];
    this.concurrency = params["concurrency"];
    this.runId = moment().format("YY_MM_DD_HH_mm");

    this.connection = new Connection(this.rgFacilityId);
    this.timings = [];
  }

  scrape() {
    return this.fetchAndParse()
      .catch(e => {
        console.log("Promise.map catch", e);
        return Promise.reject(e);
      })
      .then(results => {
        let filtered_results = this.filterResults(results);
        let resultsJson = this.resultsJson(filtered_results);
        let md5 = this.results_hash(resultsJson);

        if (this.hash === md5) {
          console.log(`${this.uniqKey} - No differences`);
          return Promise.resolve();
        } else {
          console.log(`${this.uniqKey} - Found differences`);
          return new S3Save(this.filename).do(resultsJson).then(() => {
            return new NotifyComplete(this.facilityId).post(this.runId, md5);
          });
        }
      });
  }

  fetchAndParse() {
    return this.connection
      .availability('2018-10-01', '2019-01-01')
      .catch(e => {
        console.log("problem with");

        if (e.message === "Error: ESOCKETTIMEDOUT") {
          console.log("TIMEOUT RETRY:");
        } else {
          console.log(e);
        }
        return Promise.reject(e);
      })
      .then(result => {
        this.timings.push(result.elapsedTime);
        if (result.body.length === 0) {
          console.log("RUN AGAIN");
          return Promise.reject(e);
        } else {
          return new Parse(result.body).do().then(matches => {
            return(matches);
          });
        }
      });
  }

  filterResults(results) {
    // console.log("results", results.length);
    var correctHash = {};
    _.forEach(results, function(value) {
      correctHash[value[1]] = correctHash[value[1]] || [];
      correctHash[value[1]].push(value[0]);
    });
    // console.log(correctHash);
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
