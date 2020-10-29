import rp from 'request-promise';

const headers = {
  "content-type": "application/json",
  'user-agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.32 Safari/537.36'
};

export default class Connection {
  constructor(rdrUrl, id) {
    this.rp = rp.defaults({
      headers,
      followRedirect: false,
      resolveWithFullResponse: true,
      time: true,
      timeout: 30000,
      forever: true
    });
    this.baseUrl = `${rdrUrl}/rdr/search/grid`;
    this.id = id;
  }

  async availability(startDate) {
    const endDate = startDate.clone().add(21, 'day')
    const query = {
      "FacilityId": this.id,
      "UnitTypeId":0,
      "StartDate": startDate.format("MM/DD/YYYY"),
      "InSeasonOnly":"true",
      "WebOnly":"true",
      "IsADA":"false",
      "SleepingUnitId":0,
      "MinVehicleLength":0,
      "UnitCategoryId":0,
      "UnitTypesGroupIds":[],
      "MinDate": startDate.format("MM/DD/YYYY"),
      "MaxDate": endDate.format("MM/DD/YYYY")
    }

    const options = {
      url: this.baseUrl,
      method: 'POST',
      json: true,
      body: query
      //formData: JSON.stringify(query),
    }

    // console.log(options)
    // return this.rp(options).then((response) => {
    //   console.log('Request time in ms', response.elapsedTime);
    //   return Promise.resolve(response)
    // });
    return this.rp(options);
  }
}
