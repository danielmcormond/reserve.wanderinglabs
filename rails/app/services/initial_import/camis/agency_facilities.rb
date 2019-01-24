module InitialImport::Camis
  class AgencyFacilities
    attr_accessor :agency

    def initialize(agency)
      @agency = agency
    end

    def import
      facilities[1..-1].each do |facility|
        InitialImport::Camis::Facilities.new(agency, facility).import
      end
      nil
    end

    def facilities
      @facilities ||= JSON.parse(HTTParty.get(agency.details['url'] + '/api/resourcelocation/rootmaps').body)
    end
  end
end
