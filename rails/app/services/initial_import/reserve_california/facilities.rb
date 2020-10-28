module InitialImport::UseDirect
  class Facilities
    attr_accessor :agency

    def initialize(agency)
      @agency = agency
    end

    def all_facilities
      session = InitialImport::UseDirect::Request.new
      2.upto(1000).each do |x|
        facilities_from_place(session, x)
      end
    end

    def facilities_from_place(session, place_id)
      result = JSON.parse(session.request(place_id).body)['d']['ListJsonPlaceInfos'][0]

      if result.nil?
        puts "#{place_id}: NIL Result..."
        return
      else
        puts "#{place_id}: #{result['DisplayName']}"
      end

      parent = {
        name: result['DisplayName'],
      }
      result['JsonFacilityInfos'].each do |facility_json|
        facility_attrs = InitialImport::UseDirect::FacilityParse.new(parent, facility_json).details

        update_or_create(facility_attrs)
      end
      nil
    end

    def update_or_create(attrs)
      # puts "ATTRS #{attrs}"
      Facility.where(name: attrs[:name]).first_or_create(attrs.merge(agency_id: agency.id))
    end
  end
end
