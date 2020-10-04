module InitialImport::ReserveCalifornia
  class Sites
    attr_reader :facility
    def initialize(facility)
      @facility = facility
    end

    def import(reset = false, site_ids = [])
      delete_all if reset
      if site_ids.blank?
        session = InitialImport::ReserveCalifornia::Request.new
        site_ids = InitialImport::ReserveCalifornia::SiteIds.new(session, facility).ids
      end
      site_ids.each do |site_id|
        InitialImport::ReserveCalifornia::SiteJson.new(facility, site_id).perform
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

# InitialImport::ReserveCalifornia::Sites.new(facility).import
# Facility::ReserveCalifornia.where(sites_count: 0).limit(50).each { |facility| InitialImport::ReserveCalifornia::Sites.new(facility).import; facility.cache_sites_count }


# Facility::ReserveCalifornia.where(sites_count: 0).where('id > 4902').limit(50).each { |facility| begin; InitialImport::ReserveCalifornia::Sites.new(facility).import; rescue; end; facility.cache_sites_count }
