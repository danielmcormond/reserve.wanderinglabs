module InitialImport::Camis
  class FacilitiesSection
    attr_reader :parent, :meta

    def initialize(parent, meta)
      @parent = parent
      @meta = meta
    end

    def import
      puts "\t#{name}"
      facility = facility_lookup
      if facility
        facility.update_attributes(attrs)
      else
        facility = Facility::Camis.create(attrs)
      end
      facility
    end

    def name
      "#{parent.name} - #{meta[:title]}"
    end

    def name_other
      "#{parent.name} - #{meta[:description]}"
    end

    def details
      meta.merge(parent_name: parent.name, parent_id: parent.map_id)
    end

    def attrs
      {
        agency_id: parent.agency.id,
        name: name,
        ext_facility_id: meta[:id],
        details: details,
      }
    end

    def facility_lookup
      Facility::Camis.where(agency_id: parent.agency.id).where(name: name).first ||
        Facility::Camis.where(agency_id: parent.agency.id).where(name: name_other).first
    end
  end
end
