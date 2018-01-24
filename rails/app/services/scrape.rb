class Scrape
  @queue = :scrape
  attr_reader :facility

  PERCENT_PER_MINUTE = 10

  def self.perform
    query.each do |facility|
      new(facility).work
    end
  end

  def self.query
    Facility.active_facilities.order('last_scrape_attempt ASC NULLS FIRST').limit(limit)
  end

  def self.limit
    @_limit ||= (Facility.active_facilities.count.keys.size / PERCENT_PER_MINUTE.to_f).round
  end

  def initialize(facility)
    @facility = facility
  end

  def work
    Sns.publish(facility)
    Facilities::Checked.mark_as(facility)
  end
end
