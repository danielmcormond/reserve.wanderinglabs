module InitialImport::UseDirect
  class Facility
    attr_accessor :agency, :place_id

    def initialize(agency, place_id)
      @agency = agency
      @place_id = place_id
    end

    def first_or_create(do_sites = true)
      facility = ::Facility::UseDirect.where(agency_id: agency.id, ext_facility_id: attributes[:ext_facility_id]).first_or_create(attributes)
      return unless do_sites

      facility.reload
      facility.details['Facilities'].each do |facility_json|
        InitialImport::UseDirect::SiteGroup.new(facility, facility_json).first_or_create
      end

      nil
    end

    def attributes
      {
        type: 'Facility::UseDirect',
        agency_id: agency.id,
        name: json['SelectedPlace']['Name'],
        ext_facility_id: place_id,
        details: json['SelectedPlace'],
        booking_window: 365
      }
    end

    def data
      {
        "PlaceId": place_id, "Latitude": 0, "Longitude": 0, "HighlightedPlaceId": 0, "StartDate": '10-28-2021', "Nights": 1, "CountNearby": true, "NearbyLimit": 0, "NearbyOnlyAvailable": false, "NearbyCountLimit": 0, "Sort": 'Distance', "CustomerId": '0', "RefreshFavourites": true, "IsADA": false, "UnitCategoryId": 0, "SleepingUnitId": 0, "MinVehicleLength": 0, "UnitTypesGroupIds": []
      }
    end

    def url
      agency.details['rdr'] + '/rdr/search/place'
    end

    def post
      HTTParty.post(
        url,
        body: JSON.dump(data),
        headers: {
          'Content-Type' => 'application/json'
        }
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
