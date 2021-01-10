module InitialImport::UseDirect
  class Facilities
    attr_accessor :agency

    def initialize(agency)
      @agency = agency
    end

    def import_facility_groups
      0.upto(90).each do |x|
        InitialImport::UseDirect::FacilityGroup.new(agency, x).first_or_create
      end
    end

    def import_facility_groups_from_search
      park_ids = []
      ('a'..'z').to_a.each do |a1|
        ('a'..'z').to_a.each do |a2|

          park_ids += InitialImport::UseDirect::ParkSearch.new(agency, [a1, a2].join('')).park_ids
          puts "#{[a1, a2].join('')}: #{park_ids.uniq}"
        end
      end

      park_ids.uniq.each do |x|
        InitialImport::UseDirect::FacilityGroup.new(agency, x).first_or_create
      end
    end

    def import_facility_groups_from_ids(ids)
      ids.each do |x|
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
