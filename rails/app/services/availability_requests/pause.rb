module AvailabilityRequests
  class Pause
    attr_reader :availability_request

    def initialize(availability_request)
      @availability_request = availability_request
    end

    def self.call(facility)
      scope = facility
        .availability_requests
        .active
        .not_premium
        .where('checked_count > 0 AND MOD(checked_count, 5000) = 0')

      scope.all.each do |availability_request|
        new(availability_request).call
      end
    end

    def call
      availability_request.update_attributes(status: :paused)
      return unless availability_request.notify?
      NotifierMailer.paused(availability_request).deliver
    end
  end
end
