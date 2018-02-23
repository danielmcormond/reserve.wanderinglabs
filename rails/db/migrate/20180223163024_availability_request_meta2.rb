class AvailabilityRequestMeta2 < ActiveRecord::Migration[5.1]
  def change
    add_column :availability_requests, :canceled_found, :boolean, default: false, null: false
    add_column :availability_requests, :notify_sms, :boolean, default: true, null: false
  end
end
