class Facility < ApplicationRecord
  extend Enumerize

  belongs_to :agency
  has_many :sites
  has_many :availability_requests
  has_many :availability_imports

  scope :lookup, (lambda do |start|
    where('name ILIKE ?', "#{start}%").order('name ASC').limit(15)
  end)

  scope :active, (-> { where(active: true) })

  enumerize :status,
            in: %i[active removed requires_attention],
            predicates: { prefix: true }

  def self.active_facilities
    Facility
      .left_outer_joins(:availability_requests)
      .merge(AvailabilityRequest.active)
      .group('facilities.id')
  end

  def self.top_facilities
    Facility
      .select("facilities.*, COUNT('availability_requests.id') as ar_count")
      .left_outer_joins(:availability_requests)
      .merge(AvailabilityRequest.active)
      .group('facilities.id')
      .order('ar_count desc')
  end

  def scrape_start
    [Time.now.to_date, availability_requests.active.map(&:date_start).min].max
  end

  def scrape_end
    [booking_end, availability_requests.active.map(&:date_end).max + 14].min
  end

  def booking_end
    Date.today + (booking_window || 365)
  end

  def cache_sites_count
    update_attribute(:sites_count, sites.count)
  end

  def toggle_premium_scrape
    update_attribute(:premium_scrape, !premium_scrape)
  end

  def populate_sites_details
    self.sites_details ||= {}
    self.sites_details[:types] = sites.group(:site_type).count
    self.sites_details[:max_length] = sites.pluck(:length).compact.max
    self.sites_details[:electric] = sites.group(:electric).count.keys.compact.any?
    self.sites_details[:water] = sites.where(water: true).count.positive?
    self.sites_details[:sewer] = sites.where(sewer: true).count.positive?
    self.sites_details[:site_layout] = sites.group(:site_layout).count.key?('pullthru')
    self.sites_details[:premium] = sites.where(premium: true).count.positive?
    self.sites_details[:ada] = sites.where(ada: true).count.positive?
    save
  end

  def sub_name
    ''
  end

  def scraper_type
    :lambda
  end

  def scrape
    Scrape.new(self).work
  end
end
