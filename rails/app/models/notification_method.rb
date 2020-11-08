class NotificationMethod < ApplicationRecord
  extend Enumerize

  belongs_to :user
  has_many :availability_notifications

  enumerize :notification_type, in: %i[email sms web]

  def allow?
    return true unless notification_type == :sms

    user.sms_under_limit
  end

  def sms_count
    SmsCount.new(self).count
  end
end
