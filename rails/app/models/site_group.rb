class SiteGroup < ApplicationRecord
  has_many :sites
  belongs_to :facility

  def scraper_details
    facility.scraper_details(self)
  end
end
