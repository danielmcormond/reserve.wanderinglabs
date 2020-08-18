class AvailabilityNotification < ApplicationRecord
  belongs_to :availability_request
  belongs_to :notification_method

  def self.rate_limited(since: 1.hour.ago, rate: 10)
    AvailabilityNotification
      .select(:notification_method_id)
      .where('created_at > ?', since)
      .group(:notification_method_id)
      .having('COUNT("availability_notifications"."notification_method_id") > ?', rate)
      .order('COUNT("availability_notifications"."notification_method_id")')
      .count
  end
end
