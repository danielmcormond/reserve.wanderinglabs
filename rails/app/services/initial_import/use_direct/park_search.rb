module InitialImport::UseDirect
  class ParkSearch
    attr_reader :agency, :chars
    def initialize(agency, chars)
      @agency = agency
      @chars = chars
    end

    def park_ids
      parks.map { |r| r["PlaceId"] }
    end

    def parks
      json.select { |r| r["EntityType"] == "Park" }
    end

    def url
      agency.details["rdr"] + '/rdr/fd/citypark/namecontains/' + chars
    end

    def get
      HTTParty.get(url)
    end

    def body
      @body ||= get.body
    end

    def json
      @json ||= JSON.parse(body)
    end
  end
end
