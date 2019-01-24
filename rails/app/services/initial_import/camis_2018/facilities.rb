module InitialImport::Camis
  class Facilities
    attr_accessor :agency

    def initialize(agency)
      @agency = agency
    end

    def session
      @_session ||= InitialImport::Camis::Request.new(agency)
    end

    def parks_links
      parks_body = session.get(agency.details['home_url'])
      parks_body.css('.availabilityRowHeading > a').map { |l| l.attributes['href'].value }
    end

    def import
      parks_links.each do |park_link|
        puts "park_link #{park_link}"
        facilities_body = session.get(park_link)
        facilities_body.css('.availabilityRowHeading > a').map { |l| l.attributes['href'].value }.each do |facility_link|
          puts facility_link
          attrs = InitialImport::Camis::FacilityParse.new(session, facility_link).attrs
          Facility::Camis.where(name: attrs[:name]).first_or_create(attrs.merge(agency_id: agency.id))
        end
      end
    end
  end
end
