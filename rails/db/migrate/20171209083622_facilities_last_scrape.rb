class FacilitiesLastScrape < ActiveRecord::Migration[5.1]
  def change
    add_column :facilities, :last_scrape_attempt, :datetime
  end
end
