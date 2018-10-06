module InitialImport::RecreationGovBa
  class FacilityDetails
    attr_reader :json

    IGNORE_FIELDS = %w[
      FacilityDescription
      FacilityUseFeeDescription
      FacilityMapURL
      EVENT
      ORGANIZATION
      PERMITENTRANCE
      MEDIA
      LINK
      CAMPSITE
      FacilityEmail
      LegacyFacilityID
      OrgFacilityID
      FacilityDirections
      Keywords
      ACTIVITY
      TOUR
    ]

    def self.import_by_id(recreation_gov_id)
      url = "https://ridb.recreation.gov/api/v1/facilities/#{recreation_gov_id}?apikey=#{ENV['RIDB_API_KEY']}&full=true"
      json = JSON.parse(HTTParty.get(url).body)
      new(json).update_or_create
    end

    def self.import_by_attributes(attributes)
      new(attributes).update_or_create
    end

    def initialize(json)
      @json = json
      puts "Importing: #{attributes[:name]}"
    end

    def campsite
      puts "Sites: #{json['CAMPSITE'].size}"
    end

    def update_or_create
      campsite
      return if json['CAMPSITE'].size.zero?

      facility = Facility::RecreationGovBa.where(name: attributes[:name]).first_or_initialize(attributes).tap { |e| e.update!(attributes) }
      InitialImport::RecreationGovBa::Sites.perform(facility.reload.id)
    end

    def details
      json.except(*IGNORE_FIELDS).reject { |_k, v| v.to_s.scrub.blank? }
    end

    def agency_id
      Agency.where(name: json['ORGANIZATION'][0]['OrgName']).first.id
    end

    def attributes
      {
        agency_id: agency_id,
        name: json['FacilityName'],
        details: details,
      }
    end
  end
end
