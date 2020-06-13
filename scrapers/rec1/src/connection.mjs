import rp from 'request-promise';

const headers = {
  'user-agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.32 Safari/537.36'
};

process.env.UV_THREADPOOL_SIZE = 128;

export default class Connection {
  constructor(id) {
    this.rp = rp.defaults({
      headers,
      followRedirect: false,
      resolveWithFullResponse: true,
      time: true,
      timeout: 30000,
      forever: true,
      agent: false,
      pool: {maxSockets: 100}
    });
  }

  async post(startDate, endDate, facilityIds) {
    console.log('POST', startDate.format('MM/DD/YYYY'))
    const options = {
      url: 'https://secure.rec1.com/FL/pinellas-county-fl/permits/getMultiFacilityAvailability/1fed99f759e3986c394f71ae9854c696',
      method: 'POST',
      form: {
        facilityIds,
        from: startDate.format('YYYY-MM-DD'),
        to: endDate.format('YYYY-MM-DD'),
      }
    };
    return this.rp(options);
  }
}
