class NotificationIndex < ActiveRecord::Migration[5.2]
  def change
    add_index :availability_notifications, [:notification_method_id, :throttled], name: 'avail_notif_method_throttled'
  end
end
