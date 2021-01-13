module InitialImport::UseDirect
  class SiteIds
    attr_accessor :site_group

    def initialize(site_group)
      @site_group = site_group
    end

    def ids
      units = json.dig("Facility", "Units")
      return [] unless units

      if units.is_a?(Array)
        units.map { |site| site[1]["UnitId"] }
      elsif units.is_a?(Hash)
        units.map { |k, site| site["UnitId"] }
      else
        [units.first[1]["UnitId"]]
      end
    end

    def data
      {"FacilityId":site_group.ext_id,"UnitTypeId":0,"StartDate":"01-29-2021","InSeasonOnly":true,"WebOnly":true,"IsADA":false,"SleepingUnitId":0,"MinVehicleLength":0,"UnitCategoryId":0,"UnitTypesGroupIds":[],"MinDate":"01/28/2021","MaxDate":"10/28/2022"}
    end

    def url
      site_group.facility.agency.details["rdr"] + '/rdr/search/grid'
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
