class FacilityScrapeEvery < ActiveRecord::Migration[5.2]
  def change
    add_column :facilities, :scrape_every, :integer, default: 3600
  end
end
