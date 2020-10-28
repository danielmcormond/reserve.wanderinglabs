module InitialImport::UseDirect
  class Sites
    attr_reader :facility
    def initialize(facility)
      @facility = facility
    end

    def import(reset = false, site_ids = [])
      delete_all if reset

      site_ids = InitialImport::UseDirect::SiteIds.new(facility).ids if site_ids.blank?
      site_ids.each do |site_id|
        InitialImport::UseDirect::SiteJson.new(facility, site_id).perform
      end
      facility.cache_sites_count
      facility.populate_sites_details
      nil
    end

    def delete_all
      facility.sites.delete_all
    end

    def first_or_create(attrs)
      Site.where(facility_id: facility.id).where(ext_site_id: attrs[:ext_site_id]).first_or_create(attrs)
    end
  end
end

# InitialImport::UseDirect::Facilities.new(InitialImport::UseDirect::Agency.ohio).import_facilities
# InitialImport::UseDirect::Sites.new(facility).import
# Facility::UseDirect.where(sites_count: 0).limit(50).each { |facility| InitialImport::UseDirect::Sites.new(facility).import; facility.cache_sites_count }
# Facility::UseDirect.where(sites_count: 0).where('id > 4902').limit(50).each { |facility| begin; InitialImport::UseDirect::Sites.new(facility).import; rescue; end; facility.cache_sites_count }
