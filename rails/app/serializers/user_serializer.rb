class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :premium, :premium_until, :sms_limit, :sms_count, :sms_under_limit, :feature_web_notifications
  has_many :notification_methods do
    @object.notification_methods.where(active: true)
  end
end
