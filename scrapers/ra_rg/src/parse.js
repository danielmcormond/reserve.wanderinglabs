import _ from 'lodash';
import xml2js from 'xml2js';

// const xml2jsParser = xml2js('parseString');

class Parse {

  constructor(response) {
    this.body = response;
  }

  do() {
    return new Promise((resolve, reject) => {
      // console.log(this.body.length)
      // console.log('body', _.truncate(this.body, { length: 50 }))

      xml2js.parseString(this.body, (err, result) => {
        if(err){
          reject(err);
        }
        else {
          var new_result = _.filter(result['resultset']['result'], (result) => {
            return result['$']['availabilityStatus'] === 'Y' && result['$']['reservationChannel'] === 'Web Reservable'
          })
          var mapped_new_result = _.map(new_result, (result) => {
            return result['$']['SiteId']
          })
          // console.log(mapped_new_result)
          resolve(mapped_new_result);
        }
      });
    });
  }
}

export { Parse }
