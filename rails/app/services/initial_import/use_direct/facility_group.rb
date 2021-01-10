module InitialImport::UseDirect
  class FacilityGroup
    attr_accessor :agency, :place_id

    def initialize(agency, place_id)
      @agency = agency
      @place_id = place_id
    end

    def first_or_create
      puts "Group: #{place_id}"
      return unless json["SelectedPlace"]
      puts "\t\tImporting: #{attributes[:details]["PlaceId"]}: #{attributes[:name]}"
      ::FacilityGroup.where(agency_id: agency.id).where("details->>'PlaceId' = ?", place_id.to_s).first_or_create(attributes)
    end

    def data
      {
        "PlaceId":place_id,"Latitude":0,"Longitude":0,"HighlightedPlaceId":0,"StartDate":"10-28-2020","Nights":1,"CountNearby":true,"NearbyLimit":0,"NearbyOnlyAvailable":false,"NearbyCountLimit":0,"Sort":"Distance","CustomerId":"0","RefreshFavourites":true,"IsADA":false,"UnitCategoryId":0,"SleepingUnitId":0,"MinVehicleLength":0,"UnitTypesGroupIds":[]
      }
    end

    def attributes
      {
        agency_id: agency.id,
        name: json["SelectedPlace"]["Name"],
        details: json["SelectedPlace"]
      }
    end

    def url
      agency.details["rdr"] + '/rdr/search/place'
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
