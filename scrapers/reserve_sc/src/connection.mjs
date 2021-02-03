import axios from 'axios'
import qs from 'qs'

export default class Connection {
  constructor(parkId) {
    this.parkId = parkId
    this.baseUrl = 'https://reserve.southcarolinaparks.com/reserve/camping/parkwide.html'
  }

  async availability(startDate) {
    return await axios.post(this.baseUrl, qs.stringify({
      accountKey: this.parkId,
      park_id: this.parkId,
      pwFromDate: startDate.format('MM/DD/YY'),
      stage: 1
    }))
  }
}
