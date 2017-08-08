// import rp from 'request-promise';
import rp from 'req-fast';

import Promise from 'bluebird';

const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.32 Safari/537.36',
};

class Connection {
  constructor() {
    // this.rp = rp.defaults({ headers, followRedirect: false, resolveWithFullResponse: true });
    this.base = 'https://www.recreation.gov';
  }

  get(path) {
    // /campsiteSearch.do?contractCode=NRSO&parkId=70923&arvdate=9/13/2017&lengthOfStay=1&xml=true
    const options = {
      time: true,
      url: `${this.base}${path}`,
      method: 'GET',
    };
    return new Promise((resolve, reject) => {
      rp(`${this.base}${path}`, (err, resp) => {
        if(err){
          console.log('Failed', path)
          console.log(err)
          reject(err);
        }
        else {
          console.log('resp...')
          resolve(resp)
        }
      });
    });

    // return this.rp(options).then((response) => {
    //   console.log('Request time in ms', response.elapsedTime);
    //   return Promise.resolve(response)
    // });
  }

}

export { Connection };
