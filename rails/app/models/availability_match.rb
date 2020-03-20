class AvailabilityMatch < ApplicationRecord
  belongs_to :availability_request
  belongs_to :site

  scope :available, (-> { where(available: true) })
  scope :not_in_list, (->(ids) { where('id NOT IN (?)', ids) })
  scope :notifiable, (-> { where(notified_at: nil) })
  scope :notified, (-> { where.not(notified_at: nil) })

  scope :not_recently_notified, (-> {
    where(
      <<~SQL
        EXISTS(
          SELECT 1 FROM availability_matches AS am2
          WHERE
          availability_matches.availability_request_id = am2.availability_request_id AND
          availability_matches.site_id = am2.site_id AND
          availability_matches.avail_date = am2.avail_date AND
          availability_matches.id != am2.id AND
          am2.notified_at IS NOT NULL AND
          am2.notified_at < now() - interval '30 minutes'
        )
      SQL
    )
  })

  def facility
    site.facility
  end

  def self.find_by_base62(base62)
    id = Base62.decode(base62)
    find(id)
  end
end
