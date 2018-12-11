import request from 'request-promise';

const headers = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.32 Safari/537.36',
};

export default class Connection {
  constructor(contractCode, parkId) {
    this.contractCode = contractCode;
    this.parkId = parkId;

    this.rp = request.defaults({
      headers,
      followRedirect: false,
      resolveWithFullResponse: true,
      time: true,
      timeout: 3000,
      forever: true,
    });

    this.base = 'https://www.reserveamerica.com';
  }

  async get(scrapeDate) {
    const path = `/campsiteSearch.do?contractCode=${this.contractCode}&parkId=${
      this.parkId
    }&arvdate=${scrapeDate}&lengthOfStay=1&xml=true`;

    const options = {
      url: `${this.base}${path}`,
      method: 'GET',
    };

    return this.rp(options);

    // try {
    //   const resp = await this.rp(options);
    //   console.log('resp', scrapeDate);
    //   return Promise.resolve(resp);
    // } catch (err) {
    //   try {
    //     const resp = await this.rp(options);
    //     console.log('2nd resp', scrapeDate);
    //     return Promise.resolve(resp);
    //   } catch (err) {
    //     console.log('Error');
    //   }
    // }
    // return this.rp(options).then((response) => {
    //   console.log(scrapeDate)
    //   // console.log('Request time in ms', response.elapsedTime);
    //   return Promise.resolve(response)
    // });
  }
}
