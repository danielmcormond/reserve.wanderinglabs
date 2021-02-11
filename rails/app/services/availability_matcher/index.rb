module AvailabilityMatcher
  class Index
    extend Resque::Plugins::JobStats
    include Resque::Plugins::UniqueJob

    @queue = :matcher
    attr_reader :availability_request, :enqueued_at

    def initialize(availability_request, enqueued_at = nil)
      @availability_request = availability_request
    end

    def self.call(availability_request)
      new(availability_request).call
    end

    def self.perform(availability_request_id, enqueued_at = nil)
      availability_request = AvailabilityRequest.find(availability_request_id)
      new(availability_request, enqueued_at).call
    end

    def call
      mark_unavailable
      notify
      nil
    end

    def notify
      AvailabilityRequests::Notifier.new(availability_request).notify
    end

    def mark_unavailable
      AvailabilityMatcher::Unavailable.new(availability_request, available_matches(true).map(&:id)).mark
    end

    def available_matches(do_save = false)
      @available_matches ||= AvailabilityMatcher::Finder.new(availability_request).matching_availabilities(do_save)
    end
  end
end
