
module InitialImport::RecreationGovBa
  class SiteDetails
    attr_reader :attrs, :facility_id

    def self.import_by_id(campsite_id)
      url = "https://ridb.recreation.gov/api/v1/facilities/#{recreation_gov_id}?apikey=#{ENV['RIDB_API_KEY']}&full=true"
      json = JSON.parse(HTTParty.get(url).body)
      new(json).update_or_create
    end

    def self.import_by_attributes(facility_id, attributes)
      new(facility_id, attributes).update_or_create
    end

    def initialize(facility_id, attrs)
      @facility_id = facility_id
      @attrs = attrs
      # pp attrs
    end

    def update_or_create
      # puts "site_type: #{site_type} // #{attrs['PERMITTEDEQUIPMENT'].map { |e| e['EquipmentName'] } }"
      # puts "site_layout: #{site_layout_clean} // #{site_layout} // #{attrs['type']}"
      puts attributes[:site_num]
      Site.where(facility_id: facility_id).where(ext_site_id: attributes[:ext_site_id]).first_or_initialize(attributes).tap { |e| e.update!(attributes) }
    end

    def details
      attrs.except('fee_templates', 'notices', 'rates').reject { |_k, v| v.to_s.scrub.blank? }
    end

    def attributes
      {
        ext_site_id: attrs['CampsiteID'],
        site_num: site_num,
        details: details,
        water: water,
        sewer: sewer,
        electric: electric,
        length: length,
        site_type: site_type,

        site_layout: site_layout_clean,
        premium: false,
        ada: attrs['CampsiteAccessible'] == 'true' || false,
        active: active,
      }
    end

    def active
      return false if attrs['CampsiteType'].downcase.include?('management')
      true
    end

    def site_num
      attrs['CampsiteName'].to_s.gsub('.0', '')
    end

    def length
      attrs['ATTRIBUTES'].select { |a| a['AttributeName'] == 'Max Vehicle Length' }.first.try(:[], 'AttributeValue')
    end

    def sewer
      attrs['ATTRIBUTES'].any?{ |a| a['attribute_id'] == 76 && a['AttributeValue'] == 'Yes' }
    end

    def water
      attrs['ATTRIBUTES'].any?{ |a| a['attribute_id'] == 97 && a['AttributeValue'] == 'Yes' }
    end

    def electric
      electric_attrs = attrs['ATTRIBUTES'].select { |a| a['AttributeName'] == 'Electricity Hookup' }.first
      return unless electric_attrs
      electric_attrs['AttributeValue'].to_i
    end

    def site_type
      return :group if attrs['CampsiteType'].downcase.include?('group')
      return :tent_walk_in if site_layout_clean == :hike_in
      if site_type_rv?
        :rv
      elsif equipment.any?{ |e| e.include?('tent') }
        :tent
      else
        puts "UNKNOWN SITE TYPE // #{site_layout} // #{attrs['type']} // #{attrs['CampsiteType']} // #{equipment}" if active
        :other
      end
    end

    def site_type_rv?
      equipment.any? { |e| e.include?('rv') || e.include?('camper') } ||
        (equipment.empty? && site_layout_clean == :back_in)
    end

    def equipment
      attrs['PERMITTEDEQUIPMENT'].flatten.map { |e| e['EquipmentName'].downcase }
    end

    def site_layout
      return '' unless attrs['ATTRIBUTES'].select { |a| a['AttributeName'] == 'Driveway Entry' || a['attribute_id'] == 79 }.first
      attrs['ATTRIBUTES'].select { |a| a['AttributeName'] == 'Driveway Entry' || a['attribute_id'] == 79 }.first['AttributeValue'].downcase
    end

    def site_layout_clean
      if site_layout.include?('back')
        :back_in
      elsif site_layout.include?('pull') || site_layout.include?('parallel')
        :pull_thru
      elsif site_layout.include?('drive')
        :head_in
      elsif attrs['CampsiteType'].downcase.include?('walk')
        :hike_in
      else
        puts "UNKNOWN SITE LAYOUT // #{site_layout} // #{attrs['type']} // #{attrs['CampsiteType']} // #{equipment}" if active
        :other
      end
    end
  end
end
