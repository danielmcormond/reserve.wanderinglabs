class Scrape
  @queue = :scrape
  extend Resque::Plugins::JobStats

  attr_reader :facility

  def self.perform
    Rails.logger.info("Scrape: #{query.count.sort_by { |k, v| [-v, k] }}")
    query.limit(limit).each do |facility|
      new(facility).work
    end
  end

  def self.query
    Facility
      .active_facilities
      .order('last_scrape_attempt ASC NULLS FIRST')
      .where("last_scrape_attempt + scrape_every * interval '1 second' < NOW()")
  end

  def self.limit
    @limit ||= 100
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
