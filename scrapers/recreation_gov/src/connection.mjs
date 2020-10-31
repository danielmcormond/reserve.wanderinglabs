import axios from 'axios';
import qs from 'qs'

export default class Connection {
  constructor(id) {
    this.baseUrl = `https://www.recreation.gov/api/camps/availability/campground/${id}/month`;
  }

  async availability(startDate) {
    return await axios.get(this.baseUrl, {
      params: { start_date: `${startDate}T00:00:00.000Z` },
      paramsSerializer: function(params) {
        return qs.stringify(params, { indices: false }); // param=value1&param=value2
      }
    })
  }
}
