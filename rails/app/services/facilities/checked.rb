module Facilities
  class Checked
    @queue = :common

    attr_reader :facility

    def self.perform(facility_id)
      facility = Facility.find(facility_id)
      new(facility).mark_as
    end

    def self.mark_as(facility)
      new(facility).mark_as
    end

    def initialize(facility)
      @facility = facility
    end

    def mark_as
      facility.update_attributes(last_scrape_attempt: Time.now, premium_scrape: !facility.premium_scrape)

      # TODO: UGLY...
      ids = if facility.premium_scrape
              facility.availability_requests.active.premium.pluck(:id)
            else
              facility.availability_requests.active.pluck(:id)
            end
      AvailabilityRequest.where(id: ids).update_all('checked_count = checked_count + 1, checked_at = NOW()')
      AvailabilityRequests::Pause.call(facility) unless facility.premium_scrape
    end
  end
end
