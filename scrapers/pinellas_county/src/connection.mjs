import rp from 'request-promise';

const headers = {
  'user-agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.32 Safari/537.36'
};

export default class Connection {
  constructor(id) {
    this.rp = rp.defaults({
      headers,
      followRedirect: false,
      resolveWithFullResponse: true,
      time: true,
      timeout: 3000,
      forever: true
    });
  }

  async post(startDate) {
    const options = {
      url: 'https://public.co.pinellas.fl.us/parks/PublicSearchByDate.jsp',
      method: 'POST',
      form: {
        startDate: startDate.format('MM/DD/YYYY'),
        endDate: startDate.format('MM/DD/YYYY'),
      }
    };
    return this.rp(options);
  }
}
