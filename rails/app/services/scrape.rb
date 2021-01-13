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
    Facility.scrape_needed.order('last_scrape_attempt ASC NULLS FIRST')
  end

  def self.limit
    @limit ||= 100
  end

  def initialize(facility)
    @facility = facility
  end

  def work
    # log
    if facility.site_groups_count.positive?
      facility.site_groups.each do |site_group|
        ScrapeTypes::Queue.publish(facility, site_group)
        site_group.update(last_scrape_attempt: Time.now)
      end
    else
      ScrapeTypes::Queue.publish(facility)
    end
    Facilities::Checked.mark_as(facility)
  end

  def log
    return if Rails.env.test?
  end
end
