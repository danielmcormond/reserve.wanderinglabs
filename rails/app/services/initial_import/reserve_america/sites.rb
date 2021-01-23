module InitialImport::ReserveAmerica
  class Sites
    attr_reader :facility
    def initialize(facility)
      @facility = facility
    end

    def url
      "https://www.reserveamerica.com/campsiteSearch.do?contractCode=#{facility.details['contract_code']}&parkId=#{facility.park_id}&xml=true"
    end

    def import(reset = false)
      delete_all if reset

      puts url
      r = HTTParty.get(url)
      b = r.body
      h = Hash.from_xml(b)
      Array.wrap(h['resultset']['result']).each_with_index do |set, x|
        SiteParse.new(facility, set).perform
      end
      facility.cache_sites_count
      facility.populate_sites_details
      nil
    end

    def delete_all
      facility.sites.delete_all
    end
  end
end
