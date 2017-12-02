module Admin::Reports
  class AvailabilityRequest
    def self.recent(since = 1.week.ago)
      ActiveRecord::Base.logger.level = 1

      items = ::AvailabilityRequest.where('created_at > ?', since).all.map do |a|
        {
          id: a.id,
          user: "#{a.user_id} :: #{a.user.email}",
          premium: a.user.premium,
          facility: a.facility.name,
          date: "#{a.date_start} - #{a.date_end}",
          stay_length: a.stay_length,
          checked_count: a.checked_count,
          status: a.status,
          sites: a.site_ids.size,
          matches: "#{a.availability_matches.count} / #{a.availability_matches.available.count}",
        }
      end
      ap(items, indent: 2, index: false, ruby19_syntax: true)
      ap({ count: items.size }, indent: 2, index: false, ruby19_syntax: true)
      nil
    end
  end
end
# Admin::Reports::AvailabilityRequest.recent
