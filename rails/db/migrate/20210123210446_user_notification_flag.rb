class UserNotificationFlag < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :feature_web_notifications, :boolean, default: false, null: false
    add_column :users, :web_count, :integer, default: 0, null: false
    add_column :users, :web_limit, :integer, default: 5000, null: false
  end
end
