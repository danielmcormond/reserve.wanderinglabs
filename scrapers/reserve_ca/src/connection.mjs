import rp from 'request-promise';
import Promise from 'bluebird';

const headers = {
  'user-agent':
    'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.32 Safari/537.36',
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
      url: 'https://www.reservecalifornia.com/CaliforniaWebHome/Default.aspx',
    };

    return this.rp(options).then(() => this.setSearch().then(response => Promise.resolve(response)));
  }

  setSearch() {
    const options = {
      url: 'https://www.reservecalifornia.com/CaliforniaWebHome/Facilities/AdvanceSearchm.aspx',
      method: 'POST',
      body: {
        ctl01$hdnLoginCaptchResponse: null,
        ctl01$Hidscreenresolutionmain: null,
        ctl01$hdnCulture: null,
        'g-recaptcha-response': null,
        ctl01$txtCaptcha: null,
        ctl01$AdvanceMainSearch$hdnAutoPlaceId: this.placeId,
        ctl01$AdvanceMainSearch$hdnLat: 37.17159,
        ctl01$AdvanceMainSearch$hdnLag: -122.22203,
        ctl01$AdvanceMainSearch$hdnautocomplete: null,
        ctl01$AdvanceMainSearch$hdncustomautocomplete: null,
        ctl01$AdvanceMainSearch$hdnArrivalDate: '5/28/2019',
        ctl01$AdvanceMainSearch$txtArrivalDate: '5/28/2019',
        ctl01$AdvanceMainSearch$hdnNights: 1,
        ctl01$AdvanceMainSearch$ddlNights: 1,
        ctl01$AdvanceMainSearch$hdnEnableGoogleAnalyticCodeTracing: null,
        ctl01$ctl11$indexValue: null,
        ctl01$ctl11$hidddlCategories: null,
        ctl01$ctl11$hidddlUnitType: null,
        ctl01$ctl11$hdnParkFinder: null,
        ctl01$ctl11$hdnSelectRentalType: null,
        ctl01$ctl11$hdnSelectCampingEquip: 0,
        ctl01$ctl11$hdnLeftUnitTypeName: null,
        ctl01$ctl11$hdnSelectedCategoryName: null,
        ctl01$ctl11$hdnSelectedRegionId: 0,
        ctl01$ctl11$hdnSelectedUnittypeId: null,
        ctl01$ctl11$hdnplaceid: null,
        ctl01$ctl11$hdnMultiSelect: null,
        ctl01$ctl11$hdnIsPremium: null,
        ctl01$ctl11$ddlCategories: null,
        ctl01$ctl11$ddlCampingUnit: 0,
        ctl01$ctl11$ddlLenght: 0,
        ctl01$mainContent$hdnUnitTotalDay: 6,
        ctl01$mainContent$hdnFilterSouth: null,
        ctl01$mainContent$hdnFilterNorth: null,
        ctl01$mainContent$hdnFilterEast: null,
        ctl01$mainContent$hdnFilterWest: null,
        ctl01$mainContent$hdnFilterCenterLat: null,
        ctl01$mainContent$hdnFilterCenterLong: null,
        ctl01$mainContent$hdnSearchType: null,
        ctl01$mainContent$btngetFacilitiess: 'Hure',
        ctl01$mainContent$hdndefaultLag: -122.22203,
        ctl01$mainContent$hdndefaultLat: 37.17159,
        ctl01$mainContent$hdnCheckListDatalistmode: 1,
        ctl01$mainContent$hdnWebConfigRadiusCheck: 0,
        ctl01$mainContent$hdnWebConfigRadiusValue: 150,
        ctl01$mainContent$Hidscreenresolution: 1280,
        ctl01$mainContent$hdnAllhideControl: null,
        ctl01$mainContent$hidddlUnitType: null,
        ctl01$mainContent$hdnPlaceid: this.placeId,
        ctl01$mainContent$hdnPlaceFacilirySize: 'Medium',
        ctl01$mainContent$hdnDDLPlaceId: null,
        ctl01$mainContent$hdnFacilityid: this.facilityId,
        ctl01$mainContent$hdnFacilityType: 1,
        ctl01$mainContent$hdnNodeclick: 0,
        ctl01$mainContent$hiddenPlaceLevel: 'Facility',
        ctl01$mainContent$hdnPlaceCategoryId: null,
        ctl01$mainContent$hdClient: null,
        ctl01$mainContent$hdnFav: null,
        ctl01$mainContent$hdnCheckAfterpostback: null,
        ctl01$mainContent$hiddenRPlaceLevel: null,
        ctl01$mainContent$hdnBPlaceID: null,
        ctl01$mainContent$hdnBFacilityID: null,
        ctl01$mainContent$hdnGoback: null,
        ctl01$mainContent$hdnSouth: null,
        ctl01$mainContent$hdnNorth: null,
        ctl01$mainContent$hdnEast: null,
        ctl01$mainContent$hdnWest: null,
        ctl01$mainContent$hdnCenterlat: 37.26237106323242,
        ctl01$mainContent$hdnCenterlong: -122.21236419677734,
        ctl01$mainContent$hdnCenterpointName: 0,
        ctl01$mainContent$hdnCenterpointlat: 0,
        ctl01$mainContent$hdnCenterpointlng: 0,
        ctl01$mainContent$hdnGooglePlaceRefId: 0,
        ctl01$mainContent$hdnGoogleFacilityName: 0,
        ctl01$mainContent$hdnGoolgePlaceImage: 0,
        ctl01$mainContent$hdnCheckParkDataField: 0,
        ctl01$mainContent$hdnInventoryUpdateClick: 0,
        ctl01$mainContent$facilityChanged: null,
        ctl01$mainContent$TopMenuMainSearch$ddlFacilityCategory: 1,
        ctl01$mainContent$TopMenuMainSearch$txtTopArrivalDate: '05/28/2019',
        ctl01$mainContent$TopMenuMainSearch$ddlTopNights: 1,
        ctl01$mainContent$TopMenuMainSearch$ddlSortBy: 3,
        ctl01$mainContent$txtDateRange: '5/28/2019',
        ctl01$mainContent$Grid_ddlNights: 1,
        ctl01$mainContent$ugReservationGrid$hdnSelectedUnits: null,
        ctl01$mainContent$ugReservationGrid$hdnnotavailableunit: null,
        ctl01$mainContent$ugReservationGrid$hdnnotavailableunitAdvanced: null,
        ctl01$mainContent$mapGooglePlaces$hidEventName: null,
        ctl01$mainContent$mapGooglePlaces$hidEventValue: null,
        ctl01$mainContent$LeftMenuAdvanceFilter$hidddlLeft_UnitType: null,
        ctl01$mainContent$LeftMenuAdvanceFilter$hdnLeft_SelectedCategoryName: null,
        ctl01$mainContent$LeftMenuAdvanceFilter$hidddlLeft_Categories: null,
        ctl01$mainContent$LeftMenuAdvanceFilter$Left_indexValue: null,
        ctl01$mainContent$LeftMenuAdvanceFilter$hdnLeft_SelectedUnittypeId: null,
        ctl01$mainContent$LeftMenuAdvanceFilter$hdnLeft_SelectRentalType: 0,
        ctl01$mainContent$LeftMenuAdvanceFilter$homepagefiltersearch: 0,
        ctl01$mainContent$LeftMenuAdvanceFilter$hdnLeft_SelectCampingEquip: 0,
        ctl01$mainContent$LeftMenuAdvanceFilter$hdnLeft_placeid: null,
        ctl01$mainContent$LeftMenuAdvanceFilter$hdnLeft_ParkFinderFromWM: null,
        ctl01$mainContent$LeftMenuAdvanceFilter$ddlLeft_Categories: null,
        ctl01$mainContent$LeftMenuAdvanceFilter$ddlLeft_CampingUnit: 0,
        ctl01$mainContent$LeftMenuAdvanceFilter$ddlLeft_Lenght: 0,
        ctl01$mainContent$LeftMenuAdvanceFilter$hdnPlaceUnitTypeCategory: null,
        ctl01$mainContent$LeftMenuAdvanceFilter$HiddenField1: null,
      },
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
        'content-type': 'application/json',
      },
      url:
        'https://www.reservecalifornia.com/CaliforniaWebHome/Facilities/AdvanceSearchm.aspx/GetUnitGridDataHtmlString',
      method: 'POST',
      body: {
        FacilityId: this.facilityId,
        PlaceId: this.placeId,
        MaximumDates: '20',
        IsTablet: true,
        MaximumStayforGrid: 30,
      },
    };
    return this.rp(options);
  }

  nextDate() {
    const options = {
      headers: {
        'content-type': 'application/json',
      },
      url:
        'https://www.reservecalifornia.com/CaliforniaWebHome/Facilities/AdvanceSearchm.aspx/GetNextDateUnitGrid',
      method: 'POST',
      body: {
        unitsizebool: true,
        unitclicsizechangevalue: true,
      },
    };
    return this.rp(options);
  }
}
