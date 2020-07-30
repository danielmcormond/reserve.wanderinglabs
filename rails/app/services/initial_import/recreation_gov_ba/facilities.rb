module InitialImport::RecreationGovBa
  class Facilities
    attr_reader :offset, :only_new

    def self.perform(offset = 0, only_new = false)
      ActiveRecord::Base.logger.level = 1
      fimport = InitialImport::RecreationGovBa::Facilities.new(offset, only_new)
      fimport.import
      fimport.next
      nil
    end

    def self.perform_summary(offset = 0)
      ActiveRecord::Base.logger.level = 1
      fimport = InitialImport::RecreationGovBa::Facilities.new(offset)
      fimport.summary
      fimport.next_summary
      nil
    end

    def initialize(offset = 0, only_new = false)
      @offset = offset
      @only_new = only_new
      puts "Offset: #{offset} / Only New: #{only_new}"
      puts url
    end

    def import
      puts "Current/Total: #{current} // #{total}"
      json['RECDATA'].select { |f| !only_new || ::Facility.where(ext_facility_id: f["FacilityID"]).count.zero? }.each do |fattrs|
        InitialImport::RecreationGovBa::FacilityDetails.import_by_attributes(fattrs)
      end
    end

    def summary
      puts "Current/Total: #{current} // #{total}"
      json['RECDATA'].select { |f| ::Facility.where(ext_facility_id: f["FacilityID"]).count.zero? }.each do |fattrs|
        puts %i[FacilityID FacilityName FacilityTypeDescription].map { |key| "#{key}: #{fattrs[key.to_s]}" }.join(", ")
      end
    end

    def url
      "https://ridb.recreation.gov/api/v1/facilities/?activity=CAMPING&apikey=#{ENV['RIDB_API_KEY']}&full=true&offset=#{offset}&lastupdated=2020-01-01"
    end

    def body
      @_body ||= HTTParty.get(url).body
    end

    def json
      @_json ||= JSON.parse(body)
    end

    def next
      return if current.zero?

      self.class.perform(offset + 50, only_new)
    end

    def next_summary
      return if current.zero?

      self.class.perform_summary(offset + 50)
    end

    def current
      json['METADATA']['RESULTS']['CURRENT_COUNT']
    end

    def total
      json['METADATA']['RESULTS']['TOTAL_COUNT']
    end
  end
end
