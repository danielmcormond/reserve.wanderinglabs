module InitialImport::Goingtocamp
  class SiteDetails
    attr_accessor :site_id

    RV_IDS = [-32_764, -32_763, -32_762, -32_759, -32_758, -32_757, -32_765].freeze
    TENT_IDS = [-32_768, -32_767, -32_766].freeze
    GROUP_IDS = [-32_761, -32_760].freeze

    WATER_IDS = [6, 7].freeze
    SEWER_IDS = [7].freeze

    def initialize(site_id)
      @site_id = site_id
    end

    def site
      @site ||= ::Site.find(site_id)
    end

    def import(cmd = :update)
      puts "#{site.id} // #{site_num} // #{attrs.merge(details: nil)}"
      site.update_attributes(attrs)
    end

    def attrs
      {
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
      body['localizedValues'][0]['name']
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
      body['allowedEquipment'].map { |ae| ae.values }.flatten.uniq.sort
    end

    def description
      (body['localizedValues'][0]['description'] || '').downcase
    end

    def site_type
      return :rv if (RV_IDS & allowed_equipment_ids).size.positive?
      return :tent if (TENT_IDS & allowed_equipment_ids).size.positive?
      return :group if (GROUP_IDS & allowed_equipment_ids).size.positive?
      return :tent_walk_in if description.include?('walk-in')

      if body['mapLocales'].present?
        return :tent_walk_in if body['mapLocales']['0'].downcase.include?('walk-in')
        return :group if body['mapLocales']['0'].include?('Group')
      end

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
      site.details
    end
  end
end

__END__

a = InitialImport::Goingtocamp::Agency.import
a.facilities.each do |f|
  fs = f.sites.map(&:id)
  fs.each { |sid| InitialImport::Goingtocamp::SiteDetails.new(sid).import }
end; nil
