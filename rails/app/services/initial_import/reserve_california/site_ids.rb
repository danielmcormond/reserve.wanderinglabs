module InitialImport::ReserveCalifornia
  class SiteIds
    attr_accessor :session, :facility

    def initialize(session, facility)
      @session = session
      @facility = facility
    end

    def rc_place_id
      facility.details['place_id']
    end

    def rc_facility_id
      facility.details['facility_id']
    end

    def body
      @_body ||= session.site_ids(rc_place_id, rc_facility_id).body
    end

    def ids
      body.scan(/unit_id=(\d*)/).flatten.uniq
    end
  end
end
