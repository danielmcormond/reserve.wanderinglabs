module InitialImport::ReserveCalifornia
  class Sites
    attr_reader :facility
    def initialize(facility)
      @facility = facility
    end

    def import(reset = false)
      delete_all if reset
      session = InitialImport::ReserveCalifornia::Request.new
      site_ids = InitialImport::ReserveCalifornia::SiteIds.new(session, facility).ids
      site_ids.each do |site_id|
        attrs = InitialImport::ReserveCalifornia::SiteParse.new(session, facility, site_id).details

        puts attrs
        update_or_create(attrs)
      end
    end

    def delete_all
      facility.sites.delete_all
    end

    def update_or_create(attrs)
      Site.where(facility_id: facility.id).where(ext_site_id: attrs[:ext_site_id]).first_or_create(attrs)
    end
  end
end
