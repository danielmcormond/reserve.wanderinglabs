class NotificationMethodStatus < ActiveRecord::Migration[5.1]
  def change
    add_column :notification_methods, :active, :boolean, default: true, null: false
    add_column :notification_methods, :locked, :boolean, default: false, null: false

    add_column :users, :sms_count, :integer, default: 0
  end
end
