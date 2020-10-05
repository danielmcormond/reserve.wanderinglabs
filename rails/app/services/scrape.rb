class Scrape
  @queue = :scrape
  extend Resque::Plugins::JobStats

  attr_reader :facility

  PERCENT_PER_MINUTE = 33

  def self.perform
    query.each do |facility|
      new(facility).work
    end
  end

  def self.query
    Facility
      .active_facilities
      .order('last_scrape_attempt ASC NULLS FIRST')
      .limit(limit)
  end

  def self.limit
    @limit ||= (
      Facility.active_facilities.count.keys.size * (PERCENT_PER_MINUTE / 100.to_f)
    ).round
  end

  def initialize(facility)
    @facility = facility
  end

  def work
    # log
    ScrapeTypes::Queue.publish(facility)
    Facilities::Checked.mark_as(facility)
  end

  def log
    return if Rails.env.test?
  end
end
