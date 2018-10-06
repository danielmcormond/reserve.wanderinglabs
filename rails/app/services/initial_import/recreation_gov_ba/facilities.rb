module InitialImport::RecreationGovBa
  class Facilities
    attr_reader :offset

    def self.perform(offset = 0)
      ActiveRecord::Base.logger.level = 1
      fimport = InitialImport::RecreationGovBa::Facilities.new(offset)
      fimport.import
      fimport.next
      nil
    end

    def initialize(offset = 0)
      @offset = offset
      puts "Offset: #{offset}"
      puts url
    end

    def import
      puts "Current/Total: #{current} // #{total}"
      json['RECDATA'].each do |fattrs|
        InitialImport::RecreationGovBa::FacilityDetails.import_by_attributes(fattrs)
      end
    end

    def url
      "https://ridb.recreation.gov/api/v1/facilities/?activity=CAMPING&apikey=#{ENV['RIDB_API_KEY']}&full=true&offset=#{offset}"
    end

    def body
      @_body ||= HTTParty.get(url).body
    end

    def json
      @_json ||= JSON.parse(body)
    end

    def next
      return if current.zero?
      self.class.perform(offset + 50)
    end

    def current
      json['METADATA']['RESULTS']['CURRENT_COUNT']
    end

    def total
      json['METADATA']['RESULTS']['TOTAL_COUNT']
    end
  end
end
