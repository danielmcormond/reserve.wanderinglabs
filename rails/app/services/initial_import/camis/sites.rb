module InitialImport::Camis
  class Sites
    attr_accessor :agency, :facility, :map_id

    RV_IDS = [-32_764, -32_763, -32_762, -32_759, -32_758, -32_757, -32_765].freeze
    TENT_IDS = [-32_768, -32_767, -32_766].freeze
    GROUP_IDS = [-32_761, -32_760].freeze

    WATER_IDS = [6, 7].freeze
    SEWER_IDS = [7].freeze

    def initialize(facility, map_id)
      @agency = facility.agency
      @facility = facility
      @map_id = map_id
    end

    def import(cmd = :update)
      site = find
      site.delete if cmd == :delete

      puts "\n#{map_id}"
      if cmd == :update && site.present?
        puts "\t#{site_num} // Update existing #{attrs.merge(details: nil)}"
        site.update_attributes(attrs)
      elsif site.nil?
        puts "\t#{site_num} // Create new #{attrs.merge(details: nil)}"
        Site.create(attrs)
      else
        puts "\t#{site.site_num} // Exists.. but no update"
      end
      nil
    end

    def find
      Site.where(facility_id: facility.id, ext_site_id: map_id).first
    end

    def attrs
      {
        facility_id: facility.id,
        ext_site_id: map_id,
        site_num: site_num,
        details: body,
        water: water,
        sewer: sewer,
        electric: electricity_hookup,
        length: site_length,
        site_type: site_type,
        site_layout: site_layout_clean,
        premium: premium,
        ada: ada,
        active: true,
      }
    end

    def site_num
      body['displayValues'][0]['name']
    end

    def lookup(id)
      body['definedAttributes'].select { |a| a['attributeDefinitionId'] == id }[0]
    end

    def lookup_value(id)
      lookup(id).try(:[], 'value')
    end

    def lookup_values(id)
      lookup(id).try(:[], 'values') || []
    end

    def ada
      lookup_values(-32_759).include?(0)
    end

    def water
      (lookup_values(-32_768) & WATER_IDS).size.positive?
    end

    def sewer
      (lookup_values(-32_768) & SEWER_IDS).size.positive?
    end

    def premium
      lookup_values(-32_740).include?(0)
    end

    def site_length
      lngth = lookup_value(-32_715) || lookup_value(-32_735)
      return lngth if lngth
      return 60 if allowed_equipment_ids.include?(-32_757)
      return 40 if allowed_equipment_ids.include?(-32_758)
      return 35 if allowed_equipment_ids.include?(-32_762)
      return 30 if allowed_equipment_ids.include?(-32_759)
      return 25 if allowed_equipment_ids.include?(-32_763)
      return 20 if allowed_equipment_ids.include?(-32_764)
    end

    def electricity_hookup
      return 50 if lookup_values(-32_767).include?(4)
      return 30 if lookup_values(-32_767).include?(3)
      return 20 if lookup_values(-32_767).include?(2)
      return 15 if lookup_values(-32_767).include?(1)

      nil
    end

    def allowed_equipment_ids
      body['allowedEquipment'].map { |i| [i['equipmentCategoryId'], i['subEquipmentCategoryId']] }.flatten.uniq.sort
    end

    def description
      (body['displayValues'][0]['description'] || '').downcase
    end

    def site_type
      return :rv if (RV_IDS & allowed_equipment_ids).size.positive?
      return :tent if (TENT_IDS & allowed_equipment_ids).size.positive?
      return :group if (GROUP_IDS & allowed_equipment_ids).size.positive?
      return :tent_walk_in if description.include?('walk-in')
      return :tent_walk_in if body['mapLocales']['0'].downcase.include?('walk-in')
      return :group if body['mapLocales']['0'].include?('Group')
      return :group if description.include?('Group')

      puts "SITE TYPE OTHER: #{allowed_equipment_ids}" unless allowed_equipment_ids.empty?
      :other
    end

    def site_layout_clean
      site_layout = lookup_values(-32_753).first
      return :back_in if site_layout == 2
      return :head_in if site_layout == 1
      return :pull_thru if [3, 4, 5].include?(site_layout)

      puts "SITE LAYOUT OTHER: #{site_layout}" unless site_layout.blank?
      :other
    end

    def body
      return @body if @body

      path = '/api/resource/details'
      url = "#{agency.details['url']}#{path}?resourceId=#{map_id}"
      ua = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
      puts "\t#{url}"
      resp = HTTParty.get(
        url,
        headers: {
          'User-Agent': ua,
          'Content-Type': 'application/json',
        },
        timeout: 60,
      )
      @body = JSON.parse(resp.body)
    end
  end
end
