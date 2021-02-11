module AvailabilityMatcher
  class Finder
    attr_reader :availability_request

    def initialize(availability_request)
      @availability_request = availability_request
    end

    def matching_availabilities(do_save = false)
      search.map do |matched_avail|
        availability_match = AvailabilityMatch.find_or_initialize_by(
          availability_request_id: availability_request.id,
          site_id: matched_avail[:site_id],
          length: matched_avail[:length],
          avail_date: matched_avail[:avail_min],
          available: true
        )
        availability_match.save if do_save
        availability_match
      end
    end

    def search
      AvailabilityMatcher::Search.new(availability_request).search
    end
  end
end
