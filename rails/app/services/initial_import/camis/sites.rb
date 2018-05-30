module InitialImport::Camis
  class Sites
    attr_reader :facility
    def initialize(facility)
      @facility = facility
    end

    def import(reset = false)
      delete_all if reset
      session = InitialImport::Camis::Request.new(facility.agency, true)
      site_ids = InitialImport::Camis::SiteIds.new(session, facility).ids
      site_ids.each do |site_id|
        attrs = InitialImport::Camis::SiteParse.new(session, facility, site_id).details

        #puts attrs
        update_or_create(attrs)
      end
      nil
    end

    def delete_all
      facility.sites.delete_all
    end

    def update_or_create(attrs)
      Site.where(facility_id: facility.id).where(ext_site_id: attrs[:ext_site_id]).first_or_create(attrs)
    end
  end
end

# InitialImport::Camis::Sites.new(facility).import
# Facility::Camis.where(sites_count: 0).limit(50).each { |facility| InitialImport::Camis::Sites.new(facility).import; facility.cache_sites_count; facility.populate_sites_details }
