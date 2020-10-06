module InitialImport::MaricopaCounty
  class Site
    attr_reader :facility, :site_hash
    def initialize(facility, site_hash)
      @facility = facility
      @site_hash = site_hash
    end

    def import
      site = facility.sites.where(ext_site_id: site_id).first
      if site
        site.update_attributes(site_attrs)
      else
        ::Site.create(site_attrs)
      end
      facility.cache_sites_count
      nil
    end

    def site_attrs
      {
        facility_id: facility.id,
        ext_site_id: site_id,
        site_num: site_num,
        details: site_hash,
        length: length,
        site_type: site_type,
        site_layout: site_layout,
        water: water,
        sewer: sewer,
        electric: electric,
        premium: false,
        ada: ada
      }
    end

    def site_id
      site_hash['data-siteid']
    end

    def site_num
      site_hash['data-description']
    end

    def length
      site_hash['data-maxrv']
    end

    def site_type
      return :other if site_hash['data-description'].include?('Boat')
      return :tent if site_hash['data-description'].include?('Tent')

      return :rv if site_hash['data-type'].include?('RV')
      return :rv if site_hash['data-type'].include?('Developed')

      puts "\n\n"
      puts "Site Type other #{site_hash['data-type']} // #{site_id}"
      pp site_hash
      :other
    end

    def site_layout
      return :back_in if site_hash['data-access'] == 'Back In'
      return :pull_thru if site_hash['data-access'] == 'Pull Through'
      return :other if site_hash['data-access'] == 'N/A'

      puts "site layout other #{site_hash['data-access']} // #{site_id}"
      :other
    end

    def water
      site_hash['data-water'] == 'Yes'
    end

    def sewer
      site_hash['data-sewer'] == 'Yes'
    end

    def electric
      return 50 if site_hash['data-amperage']&.include?('50')
      return 30 if site_hash['data-amperage']&.include?('30')
      return 20 if site_hash['data-amperage']&.include?('20')
      return 15 if site_hash['data-amperage']&.include?('15')
    end

    def ada
      site_hash['data-ada'] == 'Yes'
    end
  end
end
