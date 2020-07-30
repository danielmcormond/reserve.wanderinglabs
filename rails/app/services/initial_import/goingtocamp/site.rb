module InitialImport::Goingtocamp
  class Site
    attr_reader :facility, :site_hash
    def initialize(facility, site_hash)
      @facility = facility
      @site_hash = site_hash
    end

    def self.delete_all(facility)
      facility.sites.delete_all
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
        water: false,
        electric: nil,
        premium: false,
      }
    end

    def site_id
      site_hash['resourceId']
    end

    def site_num
      site_hash['localizedValues'][0]['name']
    end

    def length
      0
    end

    def site_type
      :other
    end
  end
end
