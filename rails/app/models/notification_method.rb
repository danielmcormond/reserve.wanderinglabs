class NotificationMethod < ApplicationRecord
  extend Enumerize

  belongs_to :user
  has_many :availability_notifications

  enumerize :notification_type, in: %i[email sms]

  def allow?
    return true unless notification_type == :sms

    user.sms_under_limit
  end
end
