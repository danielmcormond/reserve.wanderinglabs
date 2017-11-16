module InitialImport::ReserveCalifornia
  class FacilityParse
    attr_accessor :parent, :body

    def initialize(parent, body)
      @parent = parent
      @body = body
    end

    def details
      {
        type: 'Facility::ReserveCalifornia',
        name: name,
        details: {
          slug: slug,
          facility_id: body['FacilityId'],
          place_id: body['PlaceId'],
          category: body['FacilityCategory'],
          parent: parent[:name],
          lat: body['FacilityBoundryLatitude'],
          lng: body['FacilityBoundryLongitude'],
        },
      }
    end

    def name
      body['FacilityName']
    end

    def slug
      body['FacilityName'].parameterize
    end
  end
end
