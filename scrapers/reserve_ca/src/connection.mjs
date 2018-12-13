import rp from 'request-promise';

import Promise from 'bluebird';

const headers = {
  'user-agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.32 Safari/537.36'
};

export default class Connection {
  constructor(placeId, facilityId) {
    const jar = rp.jar();
    this.rp = rp.defaults({
      jar,
      headers,
      simple: false,
      followRedirect: false,
      resolveWithFullResponse: true,
      time: true,
      timeout: 30000,
      forever: true,
      json: true,
    });
    this.placeId = placeId;
    this.facilityId = facilityId;
  }

  setSession() {
    const options = {
      url: 'https://www.reservecalifornia.com/CaliforniaWebHome/Default.aspx'
    };

    return this.rp(options).then((response) => {
      return this.setSearch().then((response) => {
        return Promise.resolve(response)
      });
    });

  }

  setSearch() {
    const options = {
      url: 'https://www.reservecalifornia.com/CaliforniaWebHome/Facilities/AdvanceSearch.aspx',
      method: 'POST',
      body: {
        'ctl01$AdvanceMainSearch$hdnArrivalDate': '03/14/2018',
        'ctl01$AdvanceMainSearch$txtArrivalDate': '03/14/2018',
        'ctl01$AdvanceMainSearch$hdnNights': 1,
        'ctl01$AdvanceMainSearch$ddlNights': 1,
        'ctl01$mainContent$hdnUnitTotalDay': 6,
        'ctl01$mainContent$btngetFacilitiess': 'Hure',
        'ctl01$mainContent$hdnCheckListDatalistmode': 1,
        'ctl01$mainContent$Hidscreenresolution': 1280,
        'ctl01$mainContent$hdnPlaceid': this.placeId,
        'ctl01$mainContent$hdnPlaceFacilirySize': 'Medium',
        'ctl01$mainContent$hdnFacilityid': this.facilityId,
        'ctl01$mainContent$hdnFacilityType': 1,
        'ctl01$mainContent$hdnNodeclick': 0,
        'ctl01$mainContent$hiddenPlaceLevel': 'Facility',
        'ctl01$mainContent$txtDateRange': '11/28/2017',
        'ctl01$mainContent$Grid_ddlNights': 1,
        'ctl01$mainContent$TopMenuMainSearch$ddlFacilityCategory': 1,
        'ctl01$mainContent$TopMenuMainSearch$txtTopArrivalDate': '03/14/2018',
        'ctl01$mainContent$TopMenuMainSearch$ddlTopNights': 1,
        'ctl01$mainContent$TopMenuMainSearch$ddlSortBy': 3
      }
    };
    // return this.rp(options).then((response) => {
    //   console.log(response.headers['set-cookie'])
    //   console.log('Request time in ms', response.elapsedTime);
    //   return Promise.resolve(response)
    // });
    return this.rp(options);
  }

  grid() {
    const options = {
      headers: {
        'content-type': 'application/json'
      },
      url: 'https://www.reservecalifornia.com/CaliforniaWebHome/Facilities/AdvanceSearch.aspx/GetUnitGridDataHtmlString',
      method: 'POST',
      body: {
        FacilityId: this.facilityId,
        PlaceId: this.placeId,
        MaximumDates: "20",
        IsTablet: true,
        MaximumStayforGrid: 30
      }
    };
    return this.rp(options);
  }

  nextDate() {
    const options = {
      headers: {
        'content-type': 'application/json'
      },
      url: 'https://www.reservecalifornia.com/CaliforniaWebHome/Facilities/AdvanceSearch.aspx/GetNextDateUnitGrid',
      method: 'POST',
      body: {
        unitsizebool: true,
        unitclicsizechangevalue: true
      }
    };
    return this.rp(options);
  }
}
