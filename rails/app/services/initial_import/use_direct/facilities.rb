module InitialImport::UseDirect
  class Facilities
    attr_accessor :agency

    def initialize(agency)
      @agency = agency
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
        InitialImport::UseDirect::Facility.new(agency, x).first_or_create
      end
    end

    def import_facility_groups_from_ids(ids)
      ids.each do |x|
        InitialImport::UseDirect::Facility.new(agency, x).first_or_create
      end
    end
  end
end
