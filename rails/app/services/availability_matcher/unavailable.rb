module AvailabilityMatcher
  class Unavailable
    attr_reader :availability_request, :ids

    def initialize(availability_request, ids)
      @availability_request = availability_request
      @ids = ids # available_matches
    end

    def mark
      no_longer_avail.update_all(available: false, unavailable_at: Time.now)
    end

    def no_longer_avail
      ids.present? ? scope.not_in_list(ids) : scope
    end

    def scope
      availability_request.availability_matches.available
    end
  end
end
