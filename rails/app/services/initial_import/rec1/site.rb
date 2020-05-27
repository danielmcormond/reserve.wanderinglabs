module InitialImport::Rec1
  class Site
    attr_reader :facility, :site_hash
    def initialize(facility, site_hash)
      @facility = facility
      @site_hash = site_hash
    end

    def self.import(facility, reset = false)
      delete_all(facility) if reset

      data_hash = JSON.parse(File.read('/Users/tiwatson/Development/wandering-labs/reserve_wanderinglabs/rails/app/services/initial_import/rec1/sites.json'))

      data_hash['location']['facilities'].each do |site_hash|
        new(facility, site_hash).import
      end
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
        water: true,
        electric: 50,
        premium: site_hash['name'].include?(' Waterfront'),
      }
    end

    def site_id
      site_hash['id']
    end

    def site_num
      site_hash['name'].split(' ')[1]
    end

    def length
      return 16 if site_num.to_i <= 85

      60
    end

    def site_type
      :rv
    end
  end
end
