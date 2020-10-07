module InitialImport::MaricopaCounty
  class Facility
    attr_reader :url, :name, :reserve, :park_id

    FACILITIES = [
      ['http://www.maricopacountyparks.net/park-locator/cave-creek-regional-park/', 'Cave Creek', 'https://maricopacountyparks.org/cave-creek', 4],
      ['http://www.maricopacountyparks.net/park-locator/estrella-mountain-regional-park/', 'Estrella Mountain', 'https://maricopacountyparks.org/estrella', 6],
      ['http://www.maricopacountyparks.net/park-locator/lake-pleasant-regional-park/', 'Lake PLeasant', 'https://maricopacountyparks.org/lake-pleasant', 9],
      ['http://www.maricopacountyparks.net/park-locator/mcdowell-mountain-regional-park/', 'McDowell Mountain', 'https://maricopacountyparks.org/mcdowell', 11],
      ['http://www.maricopacountyparks.net/park-locator/usery-mountain-regional-park/', 'Usery Mountain', 'https://maricopacountyparks.org/usery', 14],
      ['http://www.maricopacountyparks.net/park-locator/white-tank-mountain-regional-park/', 'White Tank', 'https://maricopacountyparks.org/white-tank', 16]
    ].freeze

    def initialize(url, name, reserve, park_id)
      @url = url
      @name = name
      @reserve = reserve
      @park_id = park_id
    end

    def self.import
      FACILITIES.each do |f|
        new(f[0], f[1], f[2], f[3]).import
      end
      nil
    end

    def import
      ::Facility::MaricopaCounty.where(ext_facility_id: attributes[:ext_facility_id]).first_or_initialize(attributes).tap { |e| e.update!(attributes) }
    end

    def attributes
      {
        agency_id: agency.id,
        name: name,
        ext_facility_id: park_id,
        details: {
          url: url,
          reserve: reserve,
          park_id: park_id
        }
      }
    end

    def agency
      InitialImport::MaricopaCounty::Agency.import
    end
  end
end
