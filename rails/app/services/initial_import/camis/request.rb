module InitialImport::Camis
  class Request
    attr_accessor :agency, :base_url
    def initialize(agency)
      @agency = agency
      @base_url = agency.details['url']
    end

    def facility_meta(_ext_id)

    end
  end
end
