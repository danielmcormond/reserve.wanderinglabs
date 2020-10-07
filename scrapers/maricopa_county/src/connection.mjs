import rp from 'request-promise';

const headers = {
  'content-type': 'application/x-www-form-urlencoded',
  'user-agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.32 Safari/537.36'
};

export default class Connection {
  constructor(parkUrl, parkId) {
    this.parkId = parkId;
    this.rp = rp.defaults({
      headers,
      followRedirect: false,
      resolveWithFullResponse: true,
      time: true,
      timeout: 30000,
      forever: true
    });
    this.baseUrl = parkUrl;
  }

  async availability(startDate) {
    const endDate = startDate.clone();
    endDate.add(1, 'day')

    const body = `stage=1&park_id=${this.parkId}&paKeys=3799013&readPolicy=false&firstname=&lastname=&priAdd1=&priCity=&priState=&priZip=&phone1=&priEmail=&cardAddress=&cardCity=&cardState=&cardName=&cardZip=&date_range=${startDate.format('YYYY-MM-DD')}+to+${endDate.format('YYYY-MM-DD')}&next=`;
    const options = {
      url: `${this.baseUrl}`,
      method: 'POST',
      body
    };

    // console.log(options, body)
    // return this.rp(options).then((response) => {
    //   console.log('Request time in ms', response.elapsedTime);
    //   return Promise.resolve(response)
    // });
    return this.rp(options);
  }
}
