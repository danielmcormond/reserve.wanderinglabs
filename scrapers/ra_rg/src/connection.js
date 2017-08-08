import rp from 'request-promise';

import Promise from 'bluebird';

const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.32 Safari/537.36',
};

class Connection {
  constructor(contractCode) {
    this.rp = rp.defaults({
      headers,
      followRedirect: false,
      resolveWithFullResponse: true,
      time: true,
      timeout: 3000,
      forever: true
    });


    if (contractCode == 'NRSO') {
      this.base = 'https://www.recreation.gov';
    }
    else {
      this.base = 'https://www.reserveamerica.com';
    }
  }

  get(path) {
    // /campsiteSearch.do?contractCode=NRSO&parkId=70923&arvdate=9/13/2017&lengthOfStay=1&xml=true
    const options = {
      url: `${this.base}${path}`,
      method: 'GET',
    };

    return this.rp(options);

    // return this.rp(options).then((response) => {
    //   console.log('Request time in ms', response.elapsedTime);
    //   return Promise.resolve(response)
    // });
  }

}

export { Connection };
