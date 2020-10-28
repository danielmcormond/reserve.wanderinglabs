module InitialImport::UseDirect
  class FacilityParse
    attr_accessor :agency, :facility_group, :json

    def initialize(agency, facility_group, json)
      @agency = agency
      @facility_group = facility_group
      @json = json
    end

    def import
      update_or_create
    end

    def update_or_create(do_sites = true)
      facility = ::Facility::UseDirect.where(ext_facility_id: attributes[:ext_facility_id]).first_or_create(attributes)
      return unless do_sites

      facility.reload
      sites.each do |site|
        InitialImport::UseDirect::Site.new(facility, site).import
      end
      facility.populate_sites_details
      nil
    end

    def attributes
      {
        type: 'Facility::UseDirect',
        agency_id: agency.id,
        facility_group_id: facility_group.id,
        name: name,
        parent_name: facility_group.name,
        ext_facility_id: json[0],
        details: json[1],
        booking_window: 365
      }
    end

    def name
      json[1]['Name']
    end
  end
end
