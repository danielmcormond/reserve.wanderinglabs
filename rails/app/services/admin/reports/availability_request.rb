module Admin::Reports
  class AvailabilityRequest
    def self.recent(since = 1.week.ago)
      ActiveRecord::Base.logger.level = 1

      items = ::AvailabilityRequest.where('created_at > ?', since).all.map do |a|
        {
          email: a.user.email,
          facility: a.facility.name,
          checked_count: a.checked_count,
          status: a.status,
          sites: a.site_ids.size,
          matches: a.availability_matches.count,
        }
      end
      ap items
      nil
    end
  end
end
# Admin::Reports::AvailabilityRequest.recent
