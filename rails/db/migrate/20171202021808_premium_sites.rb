class PremiumSites < ActiveRecord::Migration[5.1]
  def change
    add_column :sites, :premium, :boolean, default: false, null: false
    add_column :availability_requests, :site_premium, :boolean, default: false, null: false
  end
end
