module AvailabilityMatcher
  class Enqueue
    def self.perform(import, premium = false)
      already_enqueued = Resque.peek('matcher', 0, 10_000).map { |job| job['args'][0] }

      enqueue_already_count = 0
      enqueue_count = 0
      enqueue_delayed_count = 0
      AvailabilityRequest.active.where(facility_id: import.facility_id).joins(:user).order(Arel.sql('users.premium desc, RANDOM()')).each do |ar|
        if already_enqueued.include?(ar.id)
          enqueue_already_count += 1
        elsif premium == false || ar.user&.premium
          Resque.enqueue(AvailabilityMatcher::Index, ar.id, Time.now)
          enqueue_count += 1
        else
          Resque.enqueue_in(1.minutes, AvailabilityMatcher::Index, ar.id)
          enqueue_delayed_count += 1
        end
      end
      Rails.logger.info "ENQ #{[import.facility_id, enqueue_count, enqueue_delayed_count, enqueue_already_count].join(" :: ")} // #{ar.facility.name}"
      nil
    end
  end

  def self.enqueued
    Resque.peek('matcher', 0, 10_000).map { |job| job['args'][0] }
  end
end
