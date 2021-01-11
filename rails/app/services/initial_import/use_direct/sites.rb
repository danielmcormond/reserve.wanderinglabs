module InitialImport::UseDirect
  class Sites
    attr_reader :site_group
    def initialize(site_group)
      @site_group = site_group
    end

    def import(reset = false, site_ids = [])
      delete_all if reset

      site_ids = InitialImport::UseDirect::SiteIds.new(site_group).ids if site_ids.blank?
      site_ids.each do |site_id|
        InitialImport::UseDirect::SiteJson.new(site_group, site_id).perform
      end
      site_group.facility.cache_sites_count
      site_group.facility.populate_sites_details
      nil
    end

    def delete_all
      site_group.sites.delete_all
    end

    def first_or_create(attrs)
      Site.where(facility_id: site_group.facility_id, site_group_id: site_group.id).where(ext_site_id: attrs[:ext_site_id]).first_or_create(attrs)
    end
  end
end

# InitialImport::UseDirect::Facilities.new(InitialImport::UseDirect::Agency.ohio).import_facilities
# InitialImport::UseDirect::Sites.new(site_group).import
# site_group::UseDirect.where(sites_count: 0).limit(50).each { |site_group| InitialImport::UseDirect::Sites.new(site_group).import; site_group.cache_sites_count }
# site_group::UseDirect.where(sites_count: 0).where('id > 4902').limit(50).each { |site_group| begin; InitialImport::UseDirect::Sites.new(site_group).import; rescue; end; site_group.cache_sites_count }
