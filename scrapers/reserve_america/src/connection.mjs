import request from 'request-promise';

const headers = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.32 Safari/537.36',
};

export default class Connection {
  constructor(contractCode, parkId) {
    this.contractCode = contractCode;
    this.parkId = parkId;

    const jar = request.jar();
    this.rp = request.defaults({
      jar,
      headers,
      followRedirect: false,
      resolveWithFullResponse: true,
      time: true,
      timeout: 3000,
      forever: true,
    });

    this.base = 'https://www.reserveamerica.com';
  }

  async setSession() {
    const options = {
      url: `https://www.reserveamerica.com/explore/got-to-get-that-session-cookie/${this.contractCode}/${this.parkId}/campsites`,
    };

    return this.rp(options);
  }

  async get(scrapeDate, page) {
    const path = `/jaxrs-json/products/${this.contractCode}/${this.parkId}?rcp=${page}&rcs=50&gad=${scrapeDate}&lsy=1&next=false`
    const options = {
      url: `${this.base}${path}`,
      method: 'GET',
    };

    return this.rp(options);
  }
}
