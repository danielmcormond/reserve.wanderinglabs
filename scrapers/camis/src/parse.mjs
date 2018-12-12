import moment from 'moment';

import dateRange from 'scraper-wandering-labs-shared/dateRange';

export default class Parse {
  static get regexpTable() {
    return /siteAvailabilityTable(.*?)<\/table>/;
  }

  static get regexpDate() {
    return /<caption>(.*?) - (.*?)<\/caption>/;
  }

  static get regexpTbody() {
    return /<tbody>(.*?)<\/tbody>/;
  }

  static get regexpTr() {
    return /<tr>(.*?)<\/tr>/gi;
  }

  static get regexpRceId() {
    return /value="(.*?)"/;
  }

  static get regexpAvail() {
    return /img alt="(.*?)"/g;
  }

  constructor(response) {
    this.body = response;
  }

  async do() {
    const table = this.body.match(Parse.regexpTable)[0];
    const startDate = moment(table.match(Parse.regexpDate)[1], 'MMM DD, YYYY');
    const endDate = moment(table.match(Parse.regexpDate)[2], 'MMM DD, YYYY');

    const availDateRange = dateRange(startDate, endDate);
    const tBody = table.match(Parse.regexpTbody)[1];
    const siteRows = tBody.match(Parse.regexpTr);

    const final = [];
    siteRows.forEach((siteRow) => {
      const rceId = siteRow.match(Parse.regexpRceId)[1];
      const matches = siteRow.match(Parse.regexpAvail);

      for (let day = 0; day < availDateRange.length; day += 1) {
        if (matches[day].includes('Available')) {
          // console.log('matches[day]', day, matches[day])
          final.push([rceId, availDateRange[day]]);
        }
      }
    });
    // console.log('final', final);
    return Promise.resolve(final);
  }
}
