module AvailabilityMatcher
  class Enqueue
    def self.perform(import, premium = false)
      enqueue_count = 0
      enqueue_delayed_count = 0
      AvailabilityRequest.active.where(facility_id: import.facility_id).joins(:user).order(Arel.sql('users.premium desc, RANDOM()')).each do |ar|
        if premium == false || ar.user&.premium
          Resque.enqueue(AvailabilityMatcher::Index, ar.id, Time.now)
          enqueue_count += 1
        else
          Resque.enqueue_in(1.minutes, AvailabilityMatcher::Index, ar.id)
          enqueue_delayed_count += 1
        end
      end
      Rails.logger.info "IMPORT ENQUEUER #{import.facility_id} C: #{enqueue_count} D: #{enqueue_delayed_count}"
      nil
    end
  end
end
