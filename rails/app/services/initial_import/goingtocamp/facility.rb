module InitialImport::Goingtocamp
  class Facility
    attr_reader :map_id, :parent_name

    def initialize(map_id, parent_name = nil)
      @map_id = map_id
      @parent_name = parent_name
    end

    def self.import
      agency = InitialImport::Goingtocamp::Agency.import
      new(agency.details[:map_id]).import
      nil
    end

    def import
      puts "\n----------------------------"
      puts map_id
      puts attributes[:name]
      puts "\tC: #{children?}"
      puts "\tS: #{sites.size}"
      if children?
        map_children
      else
        update_or_create
      end
    end

    def update_or_create(do_sites = true)
      facility = ::Facility::Goingtocamp.where(ext_facility_id: attributes[:ext_facility_id]).first_or_initialize(attributes).tap { |e| e.update!(attributes) }
      return unless do_sites

      facility.reload
      sites.each do |site|
        InitialImport::Goingtocamp::Site.new(facility, site).import
      end
      facility.populate_sites_details
      nil
    end

    def children?
      json["mapLinkLocalizedValues"].size.positive? && sites.size.zero?
    end

    def map_children
      json["mapLinkLocalizedValues"].each do |child_id, child_attrs|
        # puts "Child: #{child_id} #{child_attrs}"
        self.class.new(child_id, "#{parent_name} - #{json['map']['localizedValues'][0]['title']}").import
      end
    end

    def attributes
      {
        agency_id: InitialImport::Goingtocamp::Agency.import.id,
        name: [json["map"]["localizedValues"][0]["title"], json["map"]["localizedValues"][0]["description"]].compact.join(" - "),
        parent_name: parent_name,
        ext_facility_id: json['map']['mapId'].to_i.to_s,
        details: details,
      }
    end

    def details
      {}
    end

    def parent_map_id
      json["map"]["parentMaps"][0]
    end

    def parent
      self.class.new(parent_map_id)
    end

    def sites
      json['resourcesOnMap']
    end

    def data
      {"mapId": map_id,"cartUid":nil,"bookingUid":nil,"cartTransactionUid":nil,"bookingCategoryId":0,"startDate":"2020-07-26T00:00:00.000Z","endDate":"2020-07-27T00:00:00.000Z","isReserving":true,"getDailyAvailability":false,"partySize":1,"filterData":"[{\"attributeDefinitionId\":-32708,\"enumValues\":[1],\"attributeDefinitionDecimalValue\":0,\"filterStrategy\":1},{\"attributeDefinitionId\":-32759,\"enumValues\":[1],\"attributeDefinitionDecimalValue\":0,\"filterStrategy\":1}]","equipmentCategoryId":-32768,"subEquipmentCategoryId":-32768,"boatLength":nil,"boatDraft":nil,"boatWidth":nil,"generateBreadcrumbs":false,"resourceAccessPointId":nil}
    end

    def url
      "https://washington.goingtocamp.com/api/maps/mapdatabyid"
    end

    def post
      HTTParty.post(
        url,
        body: JSON.dump(data),
        headers: {
          'Content-Type' => 'application/json',
        },
      )
    end

    def body
      @body ||= post.body
    end

    def json
      @json ||= JSON.parse(body)
    end
  end
end
