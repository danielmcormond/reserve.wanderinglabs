module InitialImport::RecreationGov
  class FacilityWeb
    attr_reader :url
    def initialize(url)
      @url = url
    end

    def body
      @_body ||= HTTParty.get(url).body
    end

    def attrs
      {
        agency_id: 1,
        name: name,
        parent_name: "#{parent}, #{state}",
        details: {
          LegacyFacilityID: facility_id,
          Parent: parent,
          AddressStateCode: state,
        },
      }
    end

    def create
      puts attrs
      Facility::RecreationGov.where(name: attrs[:name]).first_or_create(attrs)
    end

    def name
      body.match(/Photo: (.*?)\'/)[1]
    end

    def parent
      body.match(/facility_parent_link' title='([0-9a-zA-Z\s\.\-\&]*)'/)[1]
    end

    def state
      body.match(/, ([A-Z]*) - Recreation.gov/)[1]
    end

    def facility_id
      body.match(/NRSO:([0-9]*)/)[1]
    end
  end
end
