import dateRange from 'scraper-wandering-labs-shared/src/dateRange';

export default class Parse {
  constructor(response) {
    this.body = response;
    console.log(this.body)
  }

  async do(startDate, endDate) {
    const timePeriods = dateRange(startDate, endDate);
    const matrix = JSON.parse(this.body).resourceAvailabilityMap;
    const final = [];
    Object.keys(matrix).forEach((siteId) => {
      const availabilityArray = matrix[siteId];
      for (let i = 0; i < availabilityArray.length; i += 1) {
        if (availabilityArray[i].availability === 0) {
          const formattedDate = timePeriods[i].format('MM/DD/YYYY');
          final.push([siteId, formattedDate]);
        }
      }
    });

    return Promise.resolve(final);
  }
}
