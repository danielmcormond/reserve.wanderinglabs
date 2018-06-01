import _ from "lodash";
import moment from "moment";

import DateRange from "./date_range.js";

class Parse {
  static regexpTable = /siteAvailabilityTable(.*?)<\/table>/;
  static regexpDate = /<caption>(.*?) - (.*?)<\/caption>/;
  static regexpTbody = /<tbody>(.*?)<\/tbody>/;
  static regexpTr = /<tr>(.*?)<\/tr>/gi;
  static regexpRceId = /value="(.*?)"/;
  static regexpAvail = /img alt="(.*?)"/g;

  constructor(response) {
    this.body = response;
  }


  do() {
    return new Promise((resolve, reject) => {
      const table = this.body.match(Parse.regexpTable)[0];

      const startDate = moment(
        table.match(Parse.regexpDate)[1],
        "MMM DD, YYYY"
      );
      const endDate = moment(
        table.match(Parse.regexpDate)[2],
        "MMM DD, YYYY"
      );

      let availDateRange = DateRange.getRange(startDate, endDate);

      let tBody = table.match(Parse.regexpTbody)[1];
      let siteRows = tBody.match(Parse.regexpTr);

      var final = new Array();
      siteRows.forEach(siteRow => {
        var rceId = siteRow.match(Parse.regexpRceId)[1];
        var x = 0;
        let match = Parse.regexpAvail.exec(siteRow);
        while (match != null) {
          if (match[1] == "Available") {
            final.push([rceId, availDateRange[x]]);
          }
          match = Parse.regexpAvail.exec(siteRow);
          x = x + 1;
        }
      });
      return resolve(final);
    });
  }
}

export { Parse };
