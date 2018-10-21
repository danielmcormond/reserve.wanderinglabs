import rp from 'request-promise';

const headers = {
  'user-agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.32 Safari/537.36'
};

class Connection {
  constructor(id) {
    this.rp = rp.defaults({
      headers,
      followRedirect: false,
      resolveWithFullResponse: true,
      time: true,
      timeout: 3000,
      forever: true
    });
    this.baseUrl = `https://www.recreation.gov/api/camps/availability/campground/${id}`;
  }

  availability(startDate, endDate) {
    let query = `start_date=${startDate}T00%3A00%3A00.000Z&end_date=${endDate}T00%3A00%3A00.000Z`;
    const options = {
      url: `${this.baseUrl}?${query}`
    };

    console.log(options)
    // return this.rp(options).then((response) => {
    //   console.log('Request time in ms', response.elapsedTime);
    //   return Promise.resolve(response)
    // });
    return this.rp(options);
  }
}

export { Connection };
