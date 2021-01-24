class AvailabilityNotificationSerializer < ActiveModel::Serializer
  attributes :matches_new, :matches, :created_at
  belongs_to :notification_method
end
