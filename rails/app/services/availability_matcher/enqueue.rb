module AvailabilityMatcher
  class Enqueue
    def self.perform(import, premium = false)
      AvailabilityRequest.active.where(facility_id: import.facility_id).joins(:user).order(Arel.sql('users.premium desc, RANDOM()')).each do |ar|
        if premium == false || ar.user&.premium
          Resque.enqueue(AvailabilityMatcher::Index, ar.id)
        else
          Resque.enqueue_in(1.minutes, AvailabilityMatcher::Index, ar.id)
        end
      end
      nil
    end
  end
end
