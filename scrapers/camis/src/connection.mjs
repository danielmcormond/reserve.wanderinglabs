import rp from 'request-promise';

const headers = {
  'user-agent':
    'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.32 Safari/537.36',
};

export default class Connection {
  constructor(baseUrl) {
    const jar = rp.jar();
    this.rp = rp.defaults({
      jar,
      headers,
      followRedirect: false,
      resolveWithFullResponse: true,
      time: true,
      timeout: 3000,
      forever: true,
    });
    this.baseUrl = baseUrl;
  }

  async detailsPage(path) {
    const options = {
      url: `${this.baseUrl}${path}`,
    };
    return this.rp(options);
  }

  async nextDate(nav, retry) {
    console.log('nextDate', nav, retry);
    if (retry >= 5) {
      return Promise.reject(new Error('Too many retries'));
    }

    const options = {
      url: `${this.baseUrl}/view.ashx?view=grid&nav=${nav}&order=Next`,
    };

    return this.rp(options)
      .then(response => Promise.resolve(response))
      .catch(() => this.nextDate(nav, retry + 1));
  }
}
