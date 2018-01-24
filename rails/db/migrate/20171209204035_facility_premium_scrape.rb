class FacilityPremiumScrape < ActiveRecord::Migration[5.1]
  def change
    add_column :facilities, :premium_scrape, :boolean, default: false, null: false
  end
end
