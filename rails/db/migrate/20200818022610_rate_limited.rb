class RateLimited < ActiveRecord::Migration[5.2]
  def change
    add_column :availability_notifications, :throttled, :boolean, default: false
  end
end
