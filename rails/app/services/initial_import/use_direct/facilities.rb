module InitialImport::UseDirect
  class Facilities
    attr_accessor :agency

    def initialize(agency)
      @agency = agency
    end

    def import_facility_groups
      90.upto(1000).each do |x|
        InitialImport::UseDirect::FacilityGroup.new(agency, x).first_or_create
      end
    end

    def import_facilities
      agency.facility_groups.each do |facility_group|
        facilities_from_group(facility_group)
      end
    end

    def facilities_from_group(facility_group)
      facility_group.details['Facilities'].each do |facility_json|
        InitialImport::UseDirect::FacilityParse.new(agency, facility_group, facility_json).import
      end
      nil
    end
  end
end
