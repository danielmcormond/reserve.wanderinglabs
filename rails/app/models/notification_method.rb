class NotificationMethod < ApplicationRecord
  extend Enumerize

  belongs_to :user
  has_many :availability_notifications

  enumerize :notification_type, in: %i[email sms web]

  validates :param, uniqueness: { scope: %i[user_id notification_type] }

  def allow?
    return true unless notification_type == :sms

    user.sms_under_limit
  end

  def sms_count
    SmsCount.new(self).count
  end

  def test_notification
    test_notification_web if notification_type == :web
  end

  def test_notification_web
    payload =
      {
        web: {
          notification: {
            title: 'WanderingLabs Push Notifications',
            body: 'If you got this, it worked.',
            deep_link: (ENV['RESERVE_URL']).to_s,
            icon: "#{ENV['RESERVE_URL']}/caravan-solid.png"
          }
        }
      }
    Pusher::PushNotifications.publish_to_interests(interests: [param], payload: payload)
  end
end
