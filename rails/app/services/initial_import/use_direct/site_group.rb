module InitialImport::UseDirect
  class SiteGroup
    attr_accessor :facility, :place_id, :json

    def initialize(facility, json)
      @facility = facility
      @json = json
    end

    def first_or_create
      puts "SiteGroup: #{place_id}"
      return unless json[1]['Name']

      puts "\t\tImporting: #{ext_id}: #{json[1]['Name']}"
      site_group = ::SiteGroup.where(facility_id: facility.id, ext_id: ext_id.to_s).first_or_create(attributes)

      InitialImport::UseDirect::Sites.new(site_group).import
    end

    def attributes
      {
        facility_id: facility.id,
        ext_id: ext_id,
        name: json[1]['Name'],
        details: json[1]
      }
    end

    def ext_id
      json[1]['FacilityId']
    end
  end
end
