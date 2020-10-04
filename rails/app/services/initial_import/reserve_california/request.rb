module InitialImport::ReserveCalifornia
  class Request
    attr_accessor :session
    def initialize
      set_session
    end

    def set_session
      session_request = Mechanize.new
      session_request.user_agent_alias = 'Windows Chrome'
      session_request.get('https://www.reservecalifornia.com/CaliforniaWebHome/Facilities/AdvanceSearch.aspx')
      @session = session_request.cookie_jar
    end

    def request(place_id)
      url = 'https://www.reservecalifornia.com/CaliforniaWebHome/Facilities/AdvanceSearch.aspx/GetGoogleMapPlaceData'
      place_request = Mechanize.new
      place_request.user_agent_alias = 'Windows Chrome'
      place_request.cookie_jar = session
      data = {
        googlePlaceSearchParameters: {
          "Latitude":"39.6481399536133","Longitude":"-123.617057800293","Filter":true,"BackToHome":"",
          "ChangeDragandZoom":false,"BacktoFacility":true,"ChooseActivity":nil,"IsFilterClick":false,
          "AvailabilitySearchParams":
            {"RegionId":0,"PlaceId":["0"],"FacilityId":0,"StartDate":"11/15/2017","Nights":"1","CategoryId":"0",
              "UnitTypeIds":[],"ShowOnlyAdaUnits":false,"ShowOnlyTentSiteUnits":"false","ShowOnlyRvSiteUnits":
              "false","MinimumVehicleLength":"0","PageIndex":0,"PageSize":20,"Page1":20,"NoOfRecords":100,
              "ShowSiteUnitsName":"0","ParkFinder":[],"ParkCategory":8,"ChooseActivity":"1","IsPremium":false
              },
              "IsFacilityLevel":false,
              "PlaceIdFacilityLevel":0,
              "MapboxPlaceid": place_id
        }
      }
      place_request.post(url, data.to_json, {'Content-Type' => 'application/json'})
    end

    def site_ids(place_id, facility_id)
      url = "https://reservecalifornia.com/CaliforniaWebHome/Facilities/MapView.aspx?map_id=#{facility_id}&map_level=Facility&nights=&arrival_date="
      site_request = Mechanize.new
      site_request.user_agent_alias = 'Windows Chrome'
      site_request.cookie_jar = session
      site_request.get(url, [])
    end

    def site(facility_id, site_id)
      # url = "https://reservecalifornia.com/CaliforniaWebHome/Facilities/UnitCloudTip.aspx?facility_id=#{facility_id}&unit_id=#{site_id}"
      url = "https://www.reservecalifornia.com/CaliforniaWebHome/Facilities/UnitDetailPopup.aspx?facility_id=#{facility_id}&unit_id=#{site_id}&arrival_date=09/09/2018%2012:00:00%20AM&dis=09/09/2018%2012:00:00%20AM&is_available=true&isunitnotavailable=0"
      puts url
      site_request = Mechanize.new
      site_request.user_agent_alias = 'Windows Chrome'
      site_request.cookie_jar = session
      site_request.get(url, [], 'https://www.reservecalifornia.com/CaliforniaWebHome/Facilities/AdvanceSearchm.aspx')
    end
  end
end
