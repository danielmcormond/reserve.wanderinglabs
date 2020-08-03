import rp from 'request-promise';

const headers = {
  'content-type': 'application/json',
  'user-agent':
    'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.32 Safari/537.36',
};

export default class Connection {
  constructor(baseUrl, mapId) {
    this.rp = rp.defaults({
      headers,
      followRedirect: false,
      resolveWithFullResponse: true,
      time: true,
      timeout: 3000,
      forever: true,
    });
    this.baseUrl = baseUrl;
    this.mapId = mapId;
  }

  async availability(startDate, endDate) {
    const data = {
      mapId: this.mapId,
      startDate: `${startDate.format('YYYY-MM-DD')}T07:00:00.000Z`,
      endDate: `${endDate.format('YYYY-MM-DD')}T07:00:00.000Z`,
      isReserving: true,
      getDailyAvailability: true,
      bookingCategoryId: 0,
    };
    const body = JSON.stringify(data);
    const options = {
      url: `${this.baseUrl}/api/maps/mapdatabyid`,
      method: 'POST',
      body,
    };

    return this.rp(options);
  }
}
