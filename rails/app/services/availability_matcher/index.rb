module AvailabilityMatcher
  class Index
    extend Resque::Plugins::JobStats
    @queue = :matcher
    attr_reader :availability_request, :import

    def initialize(import, availability_request)
      @import = import
      @availability_request = availability_request
    end

    def self.call(import, ar)
      new(import, ar).call
    end

    def self.perform(import_id, premium = false)
      import = AvailabilityImport.find(import_id)
      AvailabilityRequest.active.where(facility_id: import.facility_id).joins(:user).order(Arel.sql('users.premium desc, RANDOM()')).each do |ar|
        next if premium && ar.user&.premium != true

        call(import, ar)
      end
      return nil unless premium

      Resque.enqueue_in(1.minutes, AvailabilityMatcher::Index, import_id)
      nil
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
      @_available_matches ||= AvailabilityMatcher::Finder.new(
        import, availability_request
      ).matching_availabilities(do_save)
    end
  end
end
