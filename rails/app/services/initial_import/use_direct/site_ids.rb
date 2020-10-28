module InitialImport::UseDirect
  class SiteIds
    attr_accessor :facility

    def initialize(facility)
      @facility = facility
    end

    def ids
      units = json.dig("Facility", "Units")
      return [] unless units

      if units.is_a?(Array)
        units.map { |site| site[1]["UnitId"] }
      else
        [units.first[1]["UnitId"]]
      end
    end

    def data
      {"FacilityId":facility.ext_facility_id,"UnitTypeId":0,"StartDate":"10-29-2020","InSeasonOnly":true,"WebOnly":true,"IsADA":false,"SleepingUnitId":0,"MinVehicleLength":0,"UnitCategoryId":0,"UnitTypesGroupIds":[],"MinDate":"10/28/2020","MaxDate":"10/28/2021"}
    end

    def url
      facility.agency.details["rdr"] + '/rdr/search/grid'
    end

    def post
      HTTParty.post(
        url,
        body: JSON.dump(data),
        headers: {
          'Content-Type' => 'application/json',
        },
      )
    end

    def body
      @body ||= post.body
    end

    def json
      @json ||= JSON.parse(body)
    end
  end
end
