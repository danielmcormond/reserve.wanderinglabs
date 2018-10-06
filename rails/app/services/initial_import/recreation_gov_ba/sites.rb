
module InitialImport::RecreationGovBa
  class Sites
    attr_reader :facility, :offset

    def self.perform(facility_id, offset = 0, reset = false)
      ActiveRecord::Base.logger.level = 1
      sites_importer = new(Facility.find(facility_id), offset)
      sites_importer.delete_all if reset
      sites_importer.import
      sites_importer.next
    end

    def initialize(facility, offset = 0)
      @facility = facility
      @offset = offset
    end

    def import
      puts "Current/Total: #{current} // #{total}"

      puts url
      json['RECDATA'].each do |site_attr|
        InitialImport::RecreationGovBa::SiteDetails.import_by_attributes(facility.id, site_attr)
      end
      nil
    end

    def delete_all
      facility.sites.delete_all
    end

    def url
      "https://ridb.recreation.gov/api/v1/facilities/#{facility.park_id}/campsites?apikey=#{ENV['RIDB_API_KEY']}&full=true&offset=#{offset}"
    end

    def body
      @_body ||= HTTParty.get(url).body
    end

    def json
      @_json ||= JSON.parse(body)
    end

    def next
      if current < 50
        facility.cache_sites_count
        facility.populate_sites_details
        return
      end
      self.class.perform(facility.id, offset + 50)
    end

    def current
      json['METADATA']['RESULTS']['CURRENT_COUNT']
    end

    def total
      json['METADATA']['RESULTS']['TOTAL_COUNT']
    end
  end
end
